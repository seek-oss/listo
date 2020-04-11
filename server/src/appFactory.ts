import * as express from 'express';
import * as trello from './trello';
import * as slack from './slack';
import * as cors from 'cors';
import {
  DirectoryData,
  Result,
  Meta,
  DatabaseModel,
} from '../../frontend/src/types';
import { Repository } from './types';
const path = require('path');

const {
  FRONTEND_ASSETS_PATH,
  SLACK_CHANNEL_LINK,
  SLACK_TARGET_CHANNEL,
  TRELLO_BOARD_LINK,
} = process.env;

function buildProjectURL(
  scheme: string,
  host: string,
  projectId: string,
): string {
  return `${scheme}://${host}/project/${projectId}`;
}

async function appFactory(db: Repository, listoData: DirectoryData) {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.disable('etag');

  if (FRONTEND_ASSETS_PATH) {
    app.use(express.static(FRONTEND_ASSETS_PATH));
  }

  app.get('/health', async (_req, res) => {
    res.json({ status: 200 });
  });

  const apiRouter = express.Router();

  apiRouter.get('/data.json', async (_, res) => {
    res.json(listoData);
  });

  apiRouter.get('/meta', async (_req, res) => {
    try {
      const meta: Meta = {
        slackChannel: SLACK_TARGET_CHANNEL,
        slackChannelLink: SLACK_CHANNEL_LINK,
        exampleTrelloBoardLink: TRELLO_BOARD_LINK,
      };
      res.json(meta);
    } catch (err) {
      console.error(' Failed to list all projects', err);
    }
  });

  apiRouter.post('/createBoard', async (req, res) => {
    const inputData = req.body as Result;
    let board = null;
    let projectId = null;

    try {
      const project: DatabaseModel = { metaData: inputData };
      projectId = await db.create(project);
    } catch (err) {
      console.log(`Failed to store project ${projectId}.`, err);
    }

    try {
      board = await trello.createFullBoard(
        inputData.projectMetaResponses.boardName,
        inputData,
        listoData,
      );

      if (inputData.projectMetaResponses.trelloEmail) {
        await trello.addMember(
          board.id,
          inputData.projectMetaResponses.trelloEmail,
        );
      }
    } catch (err) {
      console.log(`Failed to create Trello board for ${projectId}.`, err);

      await slack.sendMessage(
        JSON.stringify({
          Status: `Failed to create board for ${inputData.projectMetaResponses.boardName}.`,
          Project: buildProjectURL(req.protocol, req.hostname, projectId),
          ProjectDetails: inputData.projectMetaResponses,
          Environment: process.env.STAGE,
        }),
      );
    }

    try {
      await db.update(projectId, board.shortUrl);
    } catch (err) {
      console.log(
        `Failed to update project (${projectId}) with board url ${board.shortUrl}...`,
        err,
      );
    }

    try {
      await slack.sendMessage(
        JSON.stringify({
          Status: `Project ${inputData.projectMetaResponses.boardName} Created Successfully!`,
          Project: buildProjectURL(req.protocol, req.hostname, projectId),
          ProjectDetails: inputData.projectMetaResponses,
          Trello: board.shortUrl,
          Environment: process.env.STAGE,
        }),
      );
    } catch (err) {
      console.log(`Failed to send Slack alert for Project ${projectId}`, err);
    }

    res.json({
      id: projectId,
      details: 'Listo Project Created Successfully',
      status: 200,
    });
  });

  apiRouter.post('/slack', async (req, res) => {
    try {
      const message = JSON.stringify(req.body);
      slack.sendMessage(message);
      res.sendStatus(204);
    } catch (err) {
      console.error('Failed send Slack alert', err);
    }
  });

  apiRouter.get('/project/:id', async (req, res) => {
    try {
      const project = await db.find(req.params.id);
      res.json({ project: JSON.stringify(project, null, 2), status: 200 });
    } catch (err) {
      console.error(`Failed to find project with ${req.params.id}`, err);
      res.status(404).send(`Project not found`);
    }
  });

  app.use('/api', apiRouter);

  // support client side routing per https://github.com/reach/router/blob/master/examples/crud/README.md#serving-apps-with-client-side-routing
  if (FRONTEND_ASSETS_PATH) {
    app.get('/*', (_req, res) => {
      res.sendFile(path.resolve(path.join(FRONTEND_ASSETS_PATH, 'index.html')));
    });
  }

  return app;
}

export default appFactory;
