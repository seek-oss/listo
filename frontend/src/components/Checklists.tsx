import React, { Fragment, useContext } from 'react';
import {
  Typography,
  List,
  ListItem,
  Box,
  Chip,
  Checkbox,
} from '@material-ui/core';
import { AppContext } from '../context';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import { useStyles, } from '../styles';
import ReactMarkdown from 'react-markdown';
import {
  getSupportedTools,
  getSelectedTools,
} from '../utils/moduleHelpers';
import { Checklists, ChecklistItem } from '../types';

interface Props {
  readOnlyMode: boolean;
  checklists: Checklists;
}
interface ChecklistProps {
  toolsSupported: string[];
  readOnlyMode: boolean;
  checklistItem: ChecklistItem;
  checklistName: string;
  checklistItemIndex: number;
}

const ListoCheckbox = (props: ChecklistProps) => {
  const classes = useStyles();
  const { handleSelectChecklistItem } = useContext(AppContext);
  if (props.toolsSupported.length) {
    return (
      <div className={classes.checklistQuestion}>
        <CheckCircleOutlineIcon className={classes.questionIcon} />
      </div>
      );
  } else if (!props.readOnlyMode) {
    return (<Checkbox
      checked={Boolean(props.checklistItem.checked)}
      onChange={event => {
        handleSelectChecklistItem(
          props.checklistName,
          props.checklistItemIndex,
          event.target.checked
        );
      }}
      color="primary" className={classes.checkboxIcon} />);
  }
  return (
    <div className={classes.checklistQuestion}>
      <PanoramaFishEyeIcon className={classes.questionIcon} />
    </div>
  );
};

const ChecklistsContainer = ({
  readOnlyMode,
  checklists
}: Props) => {
  const { tools } = useContext(AppContext);
  const classes = useStyles();

  const selectedTools = getSelectedTools(tools);

  return (
    <List dense={true}>
      {Object.entries(checklists).map(
        ([checklistName, checklistItems]) => {
          return (
            <Fragment key={checklistName}>
              <Typography>{checklistName}</Typography>
              {checklistItems.map((checklistItem, checklistItemIndex) => {
                const toolsSupported = getSupportedTools(
                  checklistItem,
                  selectedTools,
                );
                return (
                  <ListItem key={checklistItem.question}>
                    <ListoCheckbox 
                     checklistName={checklistName}
                     checklistItem={checklistItem}
                     checklistItemIndex={checklistItemIndex}
                     readOnlyMode={readOnlyMode}
                     toolsSupported={toolsSupported} />
                    <Box>
                      <ReactMarkdown source={checklistItem.question} />
                      <div className={classes.toolsWrapper}>
                        {toolsSupported.map((tool, index) => (
                          <Chip
                            key={index}
                            className={classes.toolChip}
                            label={tool}
                          />
                        ))
                        }
                        {!readOnlyMode && checklistItem.tools ? checklistItem.tools.map((tool, index) => (
                          <Chip
                            key={index}
                            className={classes.toolChip}
                            label={tool}
                          />
                        )) : null
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

export default ChecklistsContainer;