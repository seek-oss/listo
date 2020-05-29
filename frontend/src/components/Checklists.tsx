import React, { Fragment, useContext } from 'react';
import {
  Typography,
  List,
  ListItem,
  Box,
  Chip,
  Checkbox,
} from '@material-ui/core';
import { Module } from '../types';
import { AppContext } from '../context';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import { useStyles, } from '../styles';
import ReactMarkdown from 'react-markdown';
import {
  getSupportedTools,
  getSelectedTools,
} from '../utils/moduleHelpers';

interface Props {
  module: Module;
  readOnlyMode: boolean;
}
interface ChecklistProps {
  toolsSupported: string[];
  readOnlyMode: boolean;
}

const ListoCheckbox = (props: ChecklistProps) => {
  const classes = useStyles();
  if (props.toolsSupported.length > 0) {
    return (
      <div className={classes.checklistQuestion}>
        <CheckCircleOutlineIcon className={classes.questionIcon} />
      </div>
      );
  } else if (!props.readOnlyMode) {
    return ( <Checkbox color="primary" className={classes.checkboxIcon} />);
  }
  return (
    <div className={classes.checklistQuestion}>
      <PanoramaFishEyeIcon className={classes.questionIcon} />
    </div>
  );
};

const Checklists = ({
  module,
  readOnlyMode
}: Props) => {
  const { tools } = useContext(AppContext);
  const classes = useStyles();

  const selectedTools = getSelectedTools(tools);

  return (
    <List dense={true}>
      {Object.entries(module.checkLists).map(
        ([checklistName, checklistItems]) => {
          return (
            <Fragment key={checklistName}>
              <Typography>{checklistName}</Typography>
              {checklistItems.map(checklistItem => {
                const toolsSupported = getSupportedTools(
                  checklistItem,
                  selectedTools,
                );
                return (
                  <ListItem key={checklistItem.question}>
                    <ListoCheckbox readOnlyMode={readOnlyMode} toolsSupported={toolsSupported} />
                    <Box>
                      <ReactMarkdown source={checklistItem.question} />
                      <div className={classes.toolsWrapper}>
                        {toolsSupported.length > 0 ? toolsSupported.map((tool, index) => (
                          <Chip
                            key={index}
                            className={classes.toolChip}
                            label={tool}
                          />
                        )): null
                        }
                        {!readOnlyMode && checklistItem.tools ? checklistItem.tools.map((tool, index) => (
                          <Chip
                            key={index}
                            className={classes.toolChip}
                            label={tool}
                          />
                        )): null
                        }
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
  );
};

export default Checklists;