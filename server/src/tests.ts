import * as program from 'commander';
import fetch from 'node-fetch';
import * as trello from './trello';
import * as slack from './slack';

program.option('-d, --delete-board <id>', 'delete board with the supplied id');
program.option('-c, --create-board', 'create new board');
program.option('-s, --slack-message', 'send a test slack message');
program.option('-l, --list-boards', 'List all created boards');
program.option('-p, --get-project <id>', 'List a project with a specific ID');
program.parse(process.argv);

const TEST_DATA = {
  Status: 'Project Hello There Created Successfully!',
  Project: 'http://localhost:3000/project/01c77593-852f-46e2-a3e2-fcea4f1a504e',
  ProjectDetails: {
    boardName: 'Dingo Dango',
    slackTeam: 'awesomesquad',
    slackUserName: 'julian',
    codeLocation: 'sadfasda',
    trelloEmail: 'fasdfasfsd@asdfads.com',
    riskLevel: 'High Risk',
  },
  Trello: 'https://trello.com/b/dsfadsfafsdf',
};

const TEST_DATA_FULL_BOARD = {
  selectedRisks: [
    {
      text:
        'Do you want supporting teams such as Security and Architecture to reach out throughout the project?',
      selection: 'Yes',
    },
  ],
  selectedModulesByCategory: {
    code: [
      'authentication',
      'authorisation',
      'csrf',
      'internal_libs',
      'open_source',
      'third_party_libs',
      'urls',
      'xml',
      'xss',
    ],
    data: ['general', 'nosql', 'object_store', 'rds'],
    general: ['abuse', 'services', 'telemetry', 'threat_modeling'],
    service_provider: ['aws', 'datacentre'],
    software_env: ['containers', 'servers'],
  },
  projectMetaResponses: {
    boardName: 'Google Doodle',
    slackTeam: 'awesome',
    slackUserName: 'julian',
    trelloEmail: 'asdfd@sdfadf',
    riskLevel: 'High Risk',
  },
  selectedTools: ['Gantry'],
};

const TEST_DATA_CREATE = {
  selectedRisks: [
    {
      text:
        'Do you want supporting teams such as Security and Architecture to reach out throughout the project?',
      selection: 'Yes',
    },
  ],
  selectedModulesByCategory: {
    general: ['services', 'abuse', 'threat_modeling'],
    test: ['test_long_checklist'],
    code: ['authentication'],
  },
  projectMetaResponses: {
    boardName: 'Google Doodle',
    slackTeam: 'awesome',
    slackUserName: 'julian',
    trelloEmail: 'asdfd@sdfadf',
    riskLevel: 'High Risk',
  },
  selectedTools: ['Gantry'],
};

(async function main() {
  try {
    if (program.deleteBoard) {
      const id = program.deleteBoard;
      const { status, statusText } = await trello.deleteBoard(id);

      let exitCode = 0;
      if (status === 200) {
        console.log(`Successfully deleted board ${id}`);
      } else {
        console.error(
          `Unable to delete board ${id}. Server response: ${status} - ${statusText}`,
        );
        exitCode = 1;
      }
      process.exit(exitCode);
    }

    if (program.createBoard) {
      const url = 'http://localhost:8000/api/createBoard';
      const data = TEST_DATA_CREATE;
      const date = new Date(Date.now());
      data.projectMetaResponses.boardName = `Board_${date
        .getSeconds()
        .toString()}_${date.getMilliseconds().toString()}`;
      const project = JSON.stringify(data);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: project,
      };

      const res = await fetch(url, options);
      // console.log(await res.text());

      const board = await res.json();

      let exitCode = 0;
      if (board.status === 200) {
        console.log(`Successfully created board ${board.id}`);
        console.log(
          `To delete this board type: projectId=${board.id} make delete_board`,
        );
      } else {
        console.error(`Unable to create board. Server response: ${board}`);
        exitCode = 1;
      }
      process.exit(exitCode);
    }

    if (program.slackMessage) {
      const res = await slack.sendMessage(JSON.stringify(TEST_DATA));
      console.log(JSON.stringify(res));
      let exitCode = 0;
      process.exit(exitCode);
    }

    if (program.getProject) {
      const projectId = program.getProject;
      const url = `http://localhost:8000/project/${projectId}`;
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const project = await (await fetch(url, options)).json();

      let exitCode = 0;
      if (project.status === 200) {
        console.log(`Project Info: ${JSON.stringify(project)}`);
      } else {
        console.error(`Unable to list project:${project.status}`);
        exitCode = 1;
      }
      process.exit(exitCode);
    }
  } catch (err) {
    console.error(err);
  }
})();
