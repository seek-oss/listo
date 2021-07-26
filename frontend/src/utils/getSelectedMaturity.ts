import { Maturity, MaturityOption, MaturitySelection } from '../types';

const findMaturityOption = (options: MaturityOption[]) =>
  options.find(option => option.selected);

const getSelectedMaturity = (Maturity: Maturity[]) =>
Maturity.reduce<MaturitySelection[]>((selectedMaturity, Maturity) => {
    const option = findMaturityOption(Maturity.options);
    if (option) {
      return [
        ...selectedMaturity,
        {
          text: Maturity.text,
          selection: option.text,
        },
      ];
    }
    return selectedMaturity;
  }, []);

export default getSelectedMaturity;
