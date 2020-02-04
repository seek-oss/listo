import { ModuleCategory } from './../types/index';
import { Tools, CheckList, Module } from '../types';

export const getSelectedTools = (tools: Tools) => {
  return Object.keys(tools).flatMap(toolCategory =>
    Object.keys(tools[toolCategory]).filter(
      tool => tools[toolCategory][tool].response,
    ),
  );
};

export const getSupportedTools = (
  checkListItem: CheckList,
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

  return Object.values(m.checkLists)
    .flatMap(checkListItems =>
      checkListItems.map(item => {
        return getSupportedTools(item, selectedTools).length > 0;
      }),
    )
    .filter(isAnswered => isAnswered).length;
};

export const getNumberOfCheckListItems = (m: Module) => {
  if (!m.checkLists) {
    return 0;
  }

  return Object.values(m.checkLists).flatMap(checklists => checklists).length;
};

// Ideally we'd store the category title in the data. This isn't ideal
export const getCategoryName = (categoryData: ModuleCategory) =>
  Object.values(categoryData)[0].category;
