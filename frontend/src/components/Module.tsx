import React, {  useContext } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Chip,
  ExpansionPanelSummary,
  ExpansionPanel,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import { Module } from '../types';
import { HandleClickCheckbox, AppContext } from '../context';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactMarkdown from 'react-markdown';
import {
  getNumberOfAnsweredQuestions,
  getNumberOfCheckListItems,
} from '../utils/moduleHelpers';
import Checklists from './Checklists';
import { useStyles } from '../styles';

interface Props {
  moduleObject: Module;
  handleSelectModule: HandleClickCheckbox;
  categoryKey: string;
  moduleKey: string;
  readOnlyMode?: boolean;
}

const ModuleComponent = ({
  moduleObject,
  handleSelectModule,
  categoryKey,
  moduleKey,
  readOnlyMode = false,
}: Props) => {
  const { tools } = useContext(AppContext);
  const classes = useStyles();

  const numberOfAnsweredQuestions = getNumberOfAnsweredQuestions(
    moduleObject,
    tools,
  );

  const numberOfCheckListItems = getNumberOfCheckListItems(moduleObject);

  return (
    <ExpansionPanel square={true}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon color="secondary" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography component="div" className={classes.column}>
          <Box className={classes.checklistSummary}>
            {readOnlyMode && (
              <Typography >
                {moduleObject.title}
              </Typography>
            )}
            {!readOnlyMode && (
              <FormControlLabel
                onClick={event => event.stopPropagation()}
                control={
                  <Checkbox
                    checked={Boolean(moduleObject.response)}
                    onChange={event => {
                      handleSelectModule(
                        categoryKey,
                        moduleKey,
                        event.target.checked,
                      );
                    }}
                    color="primary"
                  />
                }
                label={moduleObject.title}
              />
            )}
            {readOnlyMode || Boolean(moduleObject.response) ? (
              <Chip
                label={`${numberOfAnsweredQuestions}/${numberOfCheckListItems}`}
                color="secondary"
                variant="outlined"
                className={
                  numberOfAnsweredQuestions > 0
                    ? classes.answeredQuestionsChip
                    : ''
                }
              />
            ) : null}
          </Box>
          <Typography variant="caption" gutterBottom>
            {moduleObject.assessmentQuestion}
          </Typography>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          {moduleObject.guidance ?
            (
              <Typography paragraph gutterBottom >
                <ReactMarkdown source={moduleObject.guidance} />
              </Typography>
            ) : null
          }
        
        <Checklists checklists={moduleObject.checkLists} readOnlyMode={true}/>

        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ModuleComponent;
