import { RouteComponentProps } from '@reach/router';
import React, { useContext } from 'react';
import { Typography, Grid, Button, Paper, List, ListItem } from '@material-ui/core';
import { Meta, ModuleCategory } from './types';
import { AppContext } from './context';
import { getCategoryName } from './utils/moduleHelpers';
import { useStyles } from './styles';

interface ModuleListProps extends RouteComponentProps {
  categoryName: string;
  categoryModules: ModuleCategory;
}

const ModuleList = (props: ModuleListProps) => {
  const classes = useStyles({});
  return (
            <Grid item xs={12} key={props.categoryName}>
              <Paper>
                <Typography variant="h6" gutterBottom className={classes.root}>
                  {getCategoryName(props.categoryModules)}
                </Typography>
                <List dense={true}>
                {Object.entries(props.categoryModules).map(
                  ([moduleKey, moduleObject]) => {
                    return (
                      <ListItem>
                    <Typography variant="subtitle1" gutterBottom>
                      <a href={`/checklist/${props.categoryName}/${moduleKey}`} >
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

}

interface SearchChecklistsProps extends RouteComponentProps {};

export const SearchChecklists  = (props: SearchChecklistsProps) => {
  const { categories } = useContext(AppContext);
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
            <ModuleList categoryName={categoryName} categoryModules={categoryModules}/>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};
