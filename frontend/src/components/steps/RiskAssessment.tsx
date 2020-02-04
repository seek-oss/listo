import React, { useContext } from 'react';
import { Typography, Grid } from '@material-ui/core';
import RiskCriteria from '../RiskCriteria';
import RiskAssessment from '../RiskAssessment';
import { AppContext } from '../../context';
import { getRisksToDisplay } from '../../utils';
import { riskHelp } from '../../help';
import HelpDialog from '../HelpDialog';

const RiskAssessmentContainer = () => {
  const { handleRiskAnswer, risks } = useContext(AppContext);

  if (!risks) {
    return <div>Loading risk questions....</div>;
  }

  const visibleRisks = getRisksToDisplay(risks);

  return (
    <React.Fragment>
      <Grid justify="space-between" container>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Risk Assessment for your project or feature
          </Typography>
        </Grid>
        <Grid item>
          <HelpDialog title="Risk Assessment Info" helpText={riskHelp} />
        </Grid>
      </Grid>

      {visibleRisks.map(({ text, options, description }, index) => (
        <RiskCriteria
          key={text}
          text={text}
          options={options}
          description={description}
          handleRiskOption={handleRiskAnswer(index)}
        />
      ))}
      <RiskAssessment />
    </React.Fragment>
  );
};

export default RiskAssessmentContainer;
