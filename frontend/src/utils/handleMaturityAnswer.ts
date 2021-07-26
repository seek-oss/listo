import { Maturity, MaturityOption } from '../types';

export const handleMaturityAnswer = (maturity: Maturity[], setProjectMaturity: any) => (
    selectedIndex: number,
  ) => (_: React.ChangeEvent<{}>, value: string) => {
    const text = value;
    const updatedMaturity = maturity.map(
      (m, index): Maturity => {
        return {
          ...m,
          options: m.options.map(
            (option): MaturityOption => ({
              ...option,
              selected: option.text === text,
            }),
          ),
        };
      },
    );
    setProjectMaturity(updatedMaturity);
  };