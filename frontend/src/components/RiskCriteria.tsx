import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  ExpansionPanel,
  ExpansionPanelSummary,
  withStyles,
} from '@material-ui/core';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from '../styles';
import { RiskOption } from '../types';

const UNSELECTED_KEY = 'unselected';

interface Props {
  text: string;
  description?: string;
  options: RiskOption[];
  handleRiskOption: (event: React.ChangeEvent<{}>, value: string) => void;
}

const RiskCriteria = ({
  text,
  options,
  handleRiskOption,
  description,
}: Props) => {
  const classes = useStyles({});

  if (!options) {
    // TODO: this should be moved to pre-validation
    return null;
  }

  const selectedOption = options.find(o => o.selected);
  const value = selectedOption ? selectedOption.text : UNSELECTED_KEY;

  const ExpansionPanelDetails = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      backgroundColor: '#f5f9fe',
    },
  }))(MuiExpansionPanelDetails);

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>{text}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>{description}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup onChange={handleRiskOption} value={value}>
                {options.map(option => (
                  <FormControlLabel
                    key={option.text}
                    value={option.text}
                    control={<Radio />}
                    label={option.text}
                  />
                ))}
                <FormControlLabel
                  value={UNSELECTED_KEY}
                  control={<Radio />}
                  style={{ display: 'none' }}
                  label="Hidden"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};
export default RiskCriteria;
