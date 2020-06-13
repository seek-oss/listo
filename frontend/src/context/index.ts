import { ModuleCategories, Checklists } from './../types/index';
import React from 'react';
import { Risk, ProjectMeta, AssessmentResult, Tools } from '../types';

export type HandleClickCheckbox = (
  moduleKey: string,
  subModuleKey: string,
  value: boolean,
) => void;

export type HandleUpdateProjectMeta = (name: string, response: string) => void;
export type HandleRiskAnswer = (
  event: React.ChangeEvent<{}>,
  value: string,
) => void;
export type HandleSelectModule = (
  categoryKey: string,
  moduleKey: string,
  value: boolean,
) => void;

const initialContext = {
  projectMeta: [] as ProjectMeta[],
  handleUpdateProjectMeta: (name: string, response: string) => {},
  categories: {} as ModuleCategories,
  risks: [] as Risk[],
  tools: {} as Tools,
  quickChecklist: {} as Checklists,
  initQuickChecklist: (checklists: Checklists) => {},
  handleSelectChecklistItem: (
    checklistName: string,
    checklistItemIndex: number,
    checked: boolean) => { },
  handleSelectModule: (
    categoryKey: string,
    moduleKey: string,
    value: boolean,
  ) => { },
  handleRiskAnswer: (index: number) => (
    _: React.ChangeEvent<{}>,
    value: string,
  ) => { },
  handleSelectTool: (tool: string, category: string, value: boolean) => { },
  prepareResult: (): AssessmentResult => ({
    selectedModulesByCategory: {},
    selectedRisks: [],
    projectMetaResponses: {},
    selectedTools: [],
  }),
};

export const AppContext = React.createContext(initialContext);
