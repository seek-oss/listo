import React, { Fragment, useContext } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Typography,
  List,
  ListItem,
  Box,
  Chip,
} from '@material-ui/core';
import { Module } from '../types';
import { HandleClickCheckbox, AppContext } from '../context';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import {
  useStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '../styles';
import ReactMarkdown from 'react-markdown';
import {
  getNumberOfAnsweredQuestions,
  getNumberOfCheckListItems,
  getSupportedTools,
  getSelectedTools,
} from '../utils/moduleHelpers';

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

  const selectedTools = getSelectedTools(tools);

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
      <ExpansionPanelDetails>
        <List dense={true}>
        {moduleObject.guidance ?
          (
            <Typography paragraph gutterBottom >
                <ReactMarkdown source={moduleObject.guidance} />
            </Typography>
          ) : null
        }
          {Object.entries(moduleObject.checkLists || []).map(
            ([key, checkLists]) => {
              return (
                <Fragment key={key}>
                  <Typography>{key}</Typography>
                  {checkLists.map(checkListItem => {
                    const toolsSupported = getSupportedTools(
                      checkListItem,
                      selectedTools,
                    );
                    return (
                      <ListItem key={checkListItem.question}>
                        <div className={classes.checklistQuestion}>
                          {toolsSupported.length > 0 ? (
                            <CheckCircleOutlineIcon
                              className={classes.questionIcon}
                            />
                          ) : (
                              <PanoramaFishEyeIcon
                                className={classes.questionIcon}
                              />
                            )}
                        </div>
                        <Box>
                          <ReactMarkdown source={checkListItem.question} />
                          <div className={classes.toolsWrapper}>
                            {toolsSupported.map((tool, index) => (
                              <Chip
                                key={index}
                                className={classes.toolChip}
                                label={tool}
                              />
                            ))}
                          </div>
                        </Box>
                      </ListItem>
                    );
                  })}
                </Fragment>
              );
            },
          )}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ModuleComponent;
