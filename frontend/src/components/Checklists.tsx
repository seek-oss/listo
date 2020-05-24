import React, { Fragment, useContext } from 'react';
import {
  Typography,
  List,
  ListItem,
  Box,
  Chip,
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
}

const Checklists = ({
  module
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
                          <ReactMarkdown source={checklistItem.question} />
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
      );
};

export default Checklists;