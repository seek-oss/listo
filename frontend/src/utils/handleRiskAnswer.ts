import { Risk, RiskOption } from '../types';

export const handleRiskAnswer = (risks: Risk[], setRisks: any) => (
  selectedIndex: number,
) => (_: React.ChangeEvent<{}>, value: string) => {
  const text = value;
  const updatedRisks = risks.map(
    (risk, index): Risk => {
      if (index === selectedIndex) {
        return {
          ...risk,
          options: risk.options.map(
            (option): RiskOption => ({
              ...option,
              selected: option.text === text,
            }),
          ),
        };
      }
      if (index > selectedIndex && isFinalStep(risks, selectedIndex, text)) {
        return {
          ...risk,
          options: risk.options.map(
            (option): RiskOption => ({
              ...option,
              selected: false,
            }),
          ),
        };
      }
      return risk;
    },
  );

  setRisks(updatedRisks);
};

export const isFinalStep = (
  risks: Risk[],
  selectedIndex: number,
  text: string,
) => {
  if (selectedIndex >= risks.length) {
    return false;
  }

  const foundAnswer = risks[selectedIndex].options.find(o => o.text === text);

  return foundAnswer ? Boolean(foundAnswer.risk) : false;
};
