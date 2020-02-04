import React, { useContext, MouseEvent } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useStyles } from '../styles';
import { STEPS, StepContext } from '../context/StepContext';

const PaginationButtons = () => {
  const classes = useStyles();
  const {
    activeStep,
    handleBack,
    handleNext,
    checkStepValid,
    loading,
    setLoading,
  } = useContext(StepContext);

  const stepValid = checkStepValid(activeStep);

  return (
    <div className={classes.buttons}>
      {activeStep !== 0 && (
        <Button onClick={handleBack} className={classes.button}>
          Back
        </Button>
      )}
      {loading ? (
        <CircularProgress size={20} color="secondary" />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={(e: MouseEvent) => {
            setLoading(true);
            handleNext(e);
          }}
          className={classes.button}
          disabled={!stepValid}
        >
          {activeStep === STEPS.length - 1 ? 'Submit' : 'Next'}
        </Button>
      )}
    </div>
  );
};

export default PaginationButtons;
