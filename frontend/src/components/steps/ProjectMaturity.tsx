import React, { useContext } from 'react';
import { AppContext } from '../../context';
import HelpDialog from '../HelpDialog';
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

const MaturityContainer = () => {
  const { handleMaturityAnswer, maturity } = useContext(AppContext);

  return (

      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Details about your project or feature
      </Typography>
      <Grid container spacing={5}>
        {
          maturity.map(({ text, options, description }, index) => (
              <Grid item xs={12} key={description}>
                <FormControl>
                  <RadioGroup onChange={handleMaturityAnswer(index)} >
                    {options.map(option => (
                      <FormControlLabel
                        key={option.text}
                        value={option.text}
                        control={<Radio />}
                        label={option.text}
                      />
                    ))}
                    <FormControlLabel
                      value={'undefined'}
                      control={<Radio />}
                      style={{ display: 'none' }}
                      label="Hidden"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            ),
          )}
      </Grid>
    </React.Fragment>

  );
};

export default MaturityContainer;
