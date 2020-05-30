import { RouteComponentProps } from '@reach/router';
import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import { Typography, Grid, Button, Paper, List, ListItem } from '@material-ui/core';
import { Meta } from './types';
import { AppContext } from './context';
import { getCategoryName } from './utils/moduleHelpers';
import { useStyles } from './styles';

interface SearchChecklistsProps extends RouteComponentProps {
}

export const SearchChecklists = (props: SearchChecklistsProps) => {
  const { categories } = useContext(AppContext);
  const classes = useStyles({});
  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
          Listo Checklists
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Search for and view individual checklists within Listo.
          </Typography>
        </Grid>
        {Object.entries(categories).map(([categoryName, categoryModules]) => {
          return (
            <Grid item xs={12} key={categoryName}>
              <Paper>
                <Typography variant="h6" gutterBottom className={classes.root}>
                  {getCategoryName(categoryModules)}
                </Typography>
                <List dense={true}>
                {Object.entries(categoryModules).map(
                  ([moduleKey, moduleObject]) => {
                    return (
                      <ListItem>
                    <Typography variant="subtitle1" gutterBottom>
                      <a href={`/checklist/${categoryName}/${moduleKey}`} >
                        {moduleObject.title}
                      </a>
                    </Typography>
                    </ListItem>);
                  },
                )}
                </List>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};
