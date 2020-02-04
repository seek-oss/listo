import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { navigate } from '@reach/router';
import { Typography, Grid, Button } from '@material-ui/core';
import { Meta } from './types';

interface HomeProps extends RouteComponentProps {
  listoMeta: Meta;
}

export const Home = (props: HomeProps) => {
  const isSlack = props.listoMeta
    ? Boolean(props.listoMeta.slackChannelLink && props.listoMeta.slackChannel)
    : false;
  const isTrelloBoard = props.listoMeta
    ? Boolean(props.listoMeta.exampleTrelloBoardLink)
    : false;
  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Welcome to Listo
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            This tool provides advice on security, reliability and architecture
            requirements when developing products. Think of it as insight into
            the collective technical knowledge of an engineering community.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            At the end of the review we’ll provide a link to a Trello board
            which contains the checklists for your project.{' '}
            {isTrelloBoard && (
              <a
                href={props.listoMeta.exampleTrelloBoardLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Here is an example of a full Trello board.
              </a>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Got questions? <a href={`/faq`}>Check out the FAQ's</a> or message
            us on Slack{' '}
            {isSlack && (
              <a
                href={props.listoMeta.slackChannelLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.listoMeta.slackChannel}
              </a>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/assessment')}
          >
            Do self assessment
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
