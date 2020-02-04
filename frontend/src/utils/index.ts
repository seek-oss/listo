import { Risk } from '../types';

export const getIndexOfLatestAnswer = (risks: Risk[]) => {
  const index = risks
    .slice()
    .reverse()
    .findIndex(risk => risk.options.some(o => o.selected));

  return index >= 0 ? risks.length - 1 - index : index;
};

export const getRisksToDisplay = (risks: Risk[]) => {
  const lastAnswerIndex = getIndexOfLatestAnswer(risks);

  return risks.filter((_, index, array) => {
    if (index === 0 || index <= lastAnswerIndex) {
      return true;
    }
    if (array[index - 1].options.find(o => o.selected && !o.risk)) {
      return true;
    }
    return false;
  });
};

export const getRiskLevel = (risks: Risk[]) => {
  const lastAnswerIndex = getIndexOfLatestAnswer(risks);

  if (lastAnswerIndex > -1) {
    const lastSelectedRisk = risks[lastAnswerIndex];

    const selectedAnswer = lastSelectedRisk.options.find(o => o.selected);

    return selectedAnswer ? selectedAnswer.risk : undefined;
  }
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
