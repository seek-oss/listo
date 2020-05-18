import React, { useContext } from 'react';
import {
  Box,
  Typography,
  List,
  ListItemText,
  ListItem,
  Grid,
  Paper,
} from '@material-ui/core';
import { AppContext } from '../../context';
import { selectedCategories } from '../../utils/pickCategoriesWithResponse';
import { ModuleCategory } from '../../types';
import { getCategoryName } from '../../utils/moduleHelpers';
import Module from '../Module';
import { useStyles } from '../../styles';

const Summary = () => {
  const classes = useStyles({});
  const { projectMeta, categories } = useContext(AppContext);

  const filteredCategories = selectedCategories(categories);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Listo Summary
      </Typography>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Please review that the information below is correct before we create
          your Trello Board!
        </Typography>

        <Typography variant="h6">Project Information</Typography>
        <List dense={true}>
          {projectMeta.map(meta => (
            <ListItem key={meta.name}>
              <ListItemText
                primary={meta.label}
                secondary={meta.userResponse}
              />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" gutterBottom>
          Modules Selected
        </Typography>
        <Grid container spacing={2}>
          {Object.entries<ModuleCategory>(filteredCategories).map(
            ([categoryKey, categoryData]) => (
              <Grid item xs={12} key={categoryKey}>
                <Paper>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.root}
                  >
                    {getCategoryName(categoryData)}
                  </Typography>
                  {Object.entries(categoryData).map(
                    ([moduleKey, moduleObject]) => (
                      <Module
                        key={moduleObject.title}
                        moduleObject={moduleObject}
                        handleSelectModule={() => {}}
                        categoryKey={categoryKey}
                        moduleKey={moduleKey}
                        readOnlyMode={true}
                      />
                    ),
                  )}
                </Paper>
              </Grid>
            ),
          )}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Summary;
