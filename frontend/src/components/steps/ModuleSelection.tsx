import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { AppContext } from '../../context';
import HelpDialog from '../HelpDialog';
import { modulesHelp } from '../../help';
import { Paper } from '@material-ui/core';
import { useStyles } from '../../styles';
import Module from '../Module';
import { getCategoryName } from '../../utils/moduleHelpers';

const ModuleSelection = () => {
  const { categories, handleSelectModule } = useContext(AppContext);
  const classes = useStyles({});

  return (
    <React.Fragment>
      <Grid justify="space-between" container>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Select your modules
          </Typography>
        </Grid>
        <Grid item>
          <HelpDialog title="Modules Info" helpText={modulesHelp} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {Object.entries(categories).map(([categoryName, categoryModules]) => {
          return (
            <Grid item xs={12} key={categoryName}>
              <Paper>
                <Typography variant="h6" gutterBottom className={classes.root}>
                  {getCategoryName(categoryModules)}
                </Typography>
                {Object.entries(categoryModules).map(
                  ([moduleKey, moduleObject]) => (
                    <Module
                      key={moduleObject.title}
                      categoryKey={categoryName}
                      moduleKey={moduleKey}
                      moduleObject={moduleObject}
                      handleSelectModule={handleSelectModule}
                    />
                  ),
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default ModuleSelection;
