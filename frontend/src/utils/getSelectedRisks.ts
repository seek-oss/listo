import { Risk, RiskOption, RiskSelection } from './../types';

const findRiskOption = (options: RiskOption[]) =>
  options.find(option => option.selected);

const getSelectedRisks = (risks: Risk[]) =>
  risks.reduce<RiskSelection[]>((selectedRisks, risk) => {
    const option = findRiskOption(risk.options);
    if (option) {
      return [
        ...selectedRisks,
        {
          text: risk.text,
          selection: option.text,
        },
      ];
    }
    return selectedRisks;
  }, []);

export default getSelectedRisks;
