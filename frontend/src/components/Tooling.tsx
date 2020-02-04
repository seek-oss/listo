import React, { useContext, Fragment } from 'react';
import { AppContext } from '../context';
import { Tool } from '../types';
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Grid,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  useStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '../styles';
import ReactMarkdown from 'react-markdown';
import { toolsHelp } from '../help';
import HelpDialog from './HelpDialog';

const ToolingComponent = () => {
  const { tools } = useContext(AppContext);
  return (
    <Fragment>
      <Grid justify="space-between" container>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Select your tools
          </Typography>
        </Grid>
        <Grid item>
          <HelpDialog title="Risk Assessment Info" helpText={toolsHelp} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {Object.keys(tools).map((category, index) => (
          <ToolCategoryComponent
            key={index}
            tools={tools[category]}
            category={category}
          />
        ))}
      </Grid>
    </Fragment>
  );
};

interface ToolsCategoryComponentProps {
  category: string;
  tools: { [key: string]: Tool };
}

const ToolCategoryComponent = ({
  category,
  tools,
}: ToolsCategoryComponentProps) => {
  const classes = useStyles({});
  return (
    <Grid item xs={12} spacing={2}>
      <Paper>
        <Typography variant="h6" gutterBottom className={classes.root}>
          {category}
        </Typography>
        {Object.keys(tools).map(tool => (
          <ToolComponent
            key={tool}
            name={tool}
            category={category}
            {...tools[tool]}
          />
        ))}
      </Paper>
    </Grid>
  );
};

interface ToolComponentProps extends Tool {
  name: string;
  category: string;
}

const ToolComponent = ({
  category,
  name,
  description,
  warning,
  response,
}: ToolComponentProps) => {
  const classes = useStyles();
  const { handleSelectTool } = useContext(AppContext);

  return (
    <ExpansionPanel square={true}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon color="secondary" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography component="div" className={classes.column}>
          <Box className={classes.checklistSummary}>
            <FormControlLabel
              onClick={event => event.stopPropagation()}
              control={
                <Checkbox
                  checked={Boolean(response)}
                  color="primary"
                  onChange={event => {
                    handleSelectTool(name, category, event.target.checked);
                  }}
                />
              }
              label={name}
            />
          </Box>
          <Typography variant="caption" gutterBottom color="error">
            {warning}
          </Typography>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ReactMarkdown source={description} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ToolingComponent;
