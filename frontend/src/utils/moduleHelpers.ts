import { ModuleCategory, ModuleCategories } from './../types/index';
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

export const getCategoryName = (categoryData: ModuleCategory) =>
  Object.values(categoryData)[0].category;

export const getModuleDescription = (m: Module) => { 
  if(!m) return "";
  const description = [m.assessmentQuestion];
  const resources = m.resources;
  const moduleDescription = m.guidance;

  if(moduleDescription) description.push('', '#### Guidance:', '', moduleDescription);

  if (resources) {
    description.push('', '#### Resources:', '');
    description.push(...resources.map(resource => `+ ${resource}`));
  }

  return description.join('\n');
}
export const getModule = (categories: ModuleCategories, categoryName: string, moduleName: string) => {
  if(!categories || !Object.entries(categories).length) return undefined;
  const moduleCategory = categories[categoryName];
  return moduleCategory ? moduleCategory[moduleName] : undefined;
}