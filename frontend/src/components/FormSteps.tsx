import React, { useContext } from 'react';

import { useStyles } from '../styles';
import ProjectMetaGathering from './steps/ProjectMetaGathering';
import RiskAssessment from './steps/RiskAssessment';
import ModuleSelection from './steps/ModuleSelection';
import Summary from './steps/Summary';
import PaginationButtons from './PaginationButtons';
import { AppContext } from '../context';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { StepContext, STEPS } from '../context/StepContext';
import ToolingComponent from './Tooling';

const FormSteps = () => {
  const classes = useStyles({});
  const { projectMeta, risks, categories } = useContext(AppContext);
  const { activeStep, handleGoToStep } = useContext(StepContext);

  if (!projectMeta || !risks || !categories) {
    // TODO: better empty state handling
    return <h1>Loading!</h1>;
  }

  return (
    <React.Fragment>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {STEPS.map(label => (
          <Step key={label} onClick={() => handleGoToStep(label)}>
            <StepLabel className={classes.stepLabels}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && <ProjectMetaGathering />}
      {activeStep === 1 && <RiskAssessment />}
      {activeStep === 2 && <ToolingComponent />}
      {activeStep === 3 && <ModuleSelection />}
      {activeStep === 4 && <Summary />}
      <PaginationButtons />
    </React.Fragment>
  );
};

export default FormSteps;
