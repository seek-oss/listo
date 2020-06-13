import { RouteComponentProps } from '@reach/router';
import React, { useState, useEffect } from 'react';
import { API_URL } from './constants';
import {
  Box,
  Typography,
  List,
  ListItemText,
  ListItem,
} from '@material-ui/core';
import {
  AssessmentResult,
  PickedCategories,
  ProjectMetaResponses,
  Meta,
  ProjectModel
} from './types/index';

interface ProjectProps extends RouteComponentProps {
  projectId?: string;
  listoMeta: Meta;
}

export const Project = (props: ProjectProps) => {
  const [projectMetaResponses, setProjectMetaResponses] = useState<
    ProjectMetaResponses
  >({});
  const [selectedModulesByCategory, setSelectedModulesByCategory] = useState<
    PickedCategories
  >({});
  const isSlack = props.listoMeta
    ? Boolean(props.listoMeta.slackChannelLink && props.listoMeta.slackChannel)
    : false;
  const [errorState, setErrorState] = useState(false);
  let projectId = props.projectId;

  const prepareProjectData = (
    projectResult: AssessmentResult,
    boardLink: string,
    createdAt: string,
  ) => {
    projectResult.projectMetaResponses.boardLink = boardLink;
    projectResult.projectMetaResponses.createdAt = createdAt;
    setProjectMetaResponses(projectResult.projectMetaResponses);
    setSelectedModulesByCategory(projectResult.selectedModulesByCategory);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/project/${projectId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status !== 200) throw new Error('Project not found');
        const data = await res.json();
        const project: ProjectModel = data.project;
        const projectResult: AssessmentResult = project.metaData;
        prepareProjectData(
          projectResult,
          project.boardLink || "",
          project.createdAt ? project.createdAt.toString() : "",
        );
      } catch (err) {
        setErrorState(true);
        console.log(`Error fetching the project: ${err}`);
      }
    };

    fetchData();
  }, [projectId]);

  if (errorState) {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Listo Project Not Found
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          We can't seem to find your project with ID: {projectId}.
        </Typography>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Project Details - {projectMetaResponses.boardName}
        </Typography>

        <Typography variant="caption" gutterBottom>
          {projectId}
        </Typography>

        <Box>
          <Typography variant="subtitle1">
            <p>
              Thanks for submitting your details, we've created your Trello
              board containing checklists for your project here:
              <a href={projectMetaResponses.boardLink}>
                {projectMetaResponses.boardLink}
              </a>
            </p>
          </Typography>

          <Typography variant="subtitle1">
            <p>
              Got questions? <a href={`/faq`}>Check out the FAQ's</a> or message
              us on Slack{' '}
              {isSlack ? (
                <a
                  href={props.listoMeta.slackChannelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.listoMeta.slackChannel}
                </a>
              ) : null}
            </p>
          </Typography>

          <Typography variant="h6">Project Information</Typography>
          <List dense={true}>
            {Object.entries(projectMetaResponses).map(([meta, answer]) => (
              <ListItem key={meta}>
                <ListItemText primary={meta} secondary={answer} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" gutterBottom>
            Modules Selected
          </Typography>
          {Object.entries(selectedModulesByCategory).map(
            ([category, moduleNames]) => (
              <Box>
                <Typography variant="subtitle1">{category}</Typography>

                <List dense={true}>
                  {moduleNames.map(moduleName => (
                    <ListItem key={moduleName}>
                      <ListItemText primary={moduleName} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ),
          )}
        </Box>
      </React.Fragment>
    );
  }
};
