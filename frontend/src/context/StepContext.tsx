import React, { useState, useContext } from 'react';
import { AppContext } from '.';
import { API_URL } from '../constants';
import { getRiskLevel } from '../utils';

export type STEP_TYPES =
  | 'Project Details'
  | 'Risk Assessment'
  | 'Tools'
  | 'Modules'
  | 'Summary';

export const INFO_STEP: STEP_TYPES = 'Project Details';
export const RISK_STEP: STEP_TYPES = 'Risk Assessment';
export const TOOLS_STEP: STEP_TYPES = 'Tools';
export const MODULES_STEP: STEP_TYPES = 'Modules';
export const SUMMARY_STEP: STEP_TYPES = 'Summary';

export const STEPS = [
  INFO_STEP,
  RISK_STEP,
  TOOLS_STEP,
  MODULES_STEP,
  SUMMARY_STEP,
] as STEP_TYPES[];

const initContextNoop = (...args: any[]) => {
  console.error('not implemented');
  void undefined;
};

const initialStepContext = {
  handleBack: initContextNoop,
  handleNext: initContextNoop,
  handleGoToStep: initContextNoop,
  checkStepValid: (stepIndex: number) => true,
  activeStep: 0,
  loading: false,
  setLoading: (value: boolean) => {},
};

export const StepContext = React.createContext(initialStepContext);

export const StepProvider: React.FC = ({ children }) => {
  const [activeStep, setStep] = useState(0);
  const { prepareResult, risks } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    if (activeStep > 0) {
      setStep(activeStep - 1);
    }
  };

  const handleGoToStep = (stepName: STEP_TYPES) => {
    const index = STEPS.findIndex(step => step === stepName);

    setStep(index);
  };

  const isStep = (currentStepIndex: number, stepName: STEP_TYPES) => {
    return currentStepIndex === STEPS.findIndex(step => step === stepName);
  };

  const checkStepValid = (stepIndex: number) => {
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    if (isStep(activeStep, INFO_STEP)) {
      // TODO: need to check which ones are required and only check those
      return true;
    }
    if (isStep(activeStep, RISK_STEP)) {
      const riskLevel = getRiskLevel(risks);
      return Boolean(riskLevel);
    }
    if (isStep(activeStep, TOOLS_STEP)) {
      return true;
    }
    if (isStep(activeStep, MODULES_STEP)) {
      const selectedModulesByCategory = prepareResult()
        .selectedModulesByCategory;

      return Object.keys(selectedModulesByCategory).length > 0;
    }
    return true;
  };

  const handleNext = async () => {
    if (!checkStepValid(activeStep)) {
      return;
    }

    if (isStep(activeStep, SUMMARY_STEP)) {
      try {
        const res = await fetch(`${API_URL}/createBoard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prepareResult()),
        });
        const data = await res.json();
        window.location.href = `/project/${data.id}`;
        return;
      } catch (err) {
        console.error(err);
      }
    }
    setStep(activeStep + 1);
    window.scrollTo(0, 0);
    setLoading(false);
  };

  return (
    <StepContext.Provider
      value={{
        activeStep,
        handleBack,
        handleNext,
        handleGoToStep,
        checkStepValid,
        loading,
        setLoading,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
