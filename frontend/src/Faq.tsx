import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Meta } from './types';
import { TRELLO_JIRA_MODE, API_URL } from './constants';

interface FaqProps extends RouteComponentProps {
  listoMeta: Meta;
}

export const Faq = (props: FaqProps) => (
  <React.Fragment>
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Frequently asked questions
        </Typography>
      </Grid>
    </Grid>
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          How do I change my project details after I’ve submitted a request?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Unfortunately, it isn’t possible to modify project details yourself.
          However, all the information collected during the process will be
          reflected on the generated {TRELLO_JIRA_MODE} board. You should be granted edit
          access to your {TRELLO_JIRA_MODE} board which means the project information can be
          updated there.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          How do I find the link to my board?
        </Typography>
        <Typography variant="body1" gutterBottom>
          The easiest way to find the link to your {TRELLO_JIRA_MODE} board is by visiting
          the {props.listoMeta.slackChannel} Slack channel if you created it
          recently. If you can’t find your board there, reach out in{' '}
          {props.listoMeta.slackChannel} and the team can help you find the
          link.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          I’m building a new service, what are the fundamentals I need to be
          aware of?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Listo will guide you through the process of selecting tools and
          modules that would apply to your initiative and ultimately determine
          the risk
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          What are you basing the decisions on?
        </Typography>
        <Typography variant="body1" gutterBottom>
          The content exposed by Listo is open for anyone to contribute to by
          opening Pull Requests against the Listo GitHub project. By using Pull
          Requests it’s up to the community of Listo users to define the
          content. Data can come from other places like AWS Best Practices, OWAP
          Top 10 and other patterns and practices.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          How do I provide feedback about Listo?
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you are reporting a bug or would like to request a feature, please
          raise a GitHub issue.
        </Typography>
      </Grid>
    </Grid>
  </React.Fragment>
);
