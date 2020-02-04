import React, { useContext } from 'react';
import { useStyles } from '../styles';
import { AppContext } from '../context';
import { Grid, Paper, Typography } from '@material-ui/core';
import { getRiskLevel } from '../utils';

const RiskAssessment = () => {
  const classes = useStyles({});
  const { risks } = useContext(AppContext);

  const riskLevel = getRiskLevel(risks);

  return riskLevel ? (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.asessment}>
            <Typography variant="h6" gutterBottom>
              Your project is {riskLevel}!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  ) : null;
};

export default RiskAssessment;
