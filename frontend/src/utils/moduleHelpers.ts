import { ModuleCategory } from './../types/index';
import { Tools, ChecklistItem, Module } from '../types';

const getAllChecklistItems = (m: Module) => {
  return Object.values(m.checkLists).flatMap(checklist => Object.values(checklist)).flat();
};

export const getSelectedTools = (tools: Tools) => {
  return Object.keys(tools).flatMap(toolCategory =>
    Object.keys(tools[toolCategory]).filter(
      tool => tools[toolCategory][tool].response,
    ),
  );
};

export const getSupportedTools = (
  checkListItem: ChecklistItem,
  selectedTools: string[],
): string[] => {
  if (!checkListItem.tools) {
    return [];
  }
  return checkListItem.tools.filter(tool => selectedTools.includes(tool));
};

export const getNumberOfAnsweredQuestions = (m: Module, tools: Tools) => {
  if (!m.checkLists) {
    return 0;
  }

  const selectedTools = getSelectedTools(tools);
  const allChecklistItems = getAllChecklistItems(m);

  return allChecklistItems.map(checklistItem => {
    return getSupportedTools(checklistItem, selectedTools).length > 0;
  })
    .filter(isAnswered => isAnswered).length;
};


export const getNumberOfCheckListItems = (m: Module) => {
  if (!m.checkLists) {
    return 0;
  }
  return getAllChecklistItems(m).length;
};

// Ideally we'd store the category title in the data. This isn't ideal
export const getCategoryName = (categoryData: ModuleCategory) =>
  Object.values(categoryData)[0].category;
