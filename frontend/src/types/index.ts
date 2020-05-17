export interface ProjectMeta {
  name: string;
  placeholder?: string;
  required?: boolean;
  label: string;
  type: 'input';
  userResponse?: string;
}

export type ProjectMetaResponses = Record<string, string | undefined>;

export interface Meta {
  exampleTrelloBoardLink?: string;
  slackChannelLink?: string;
  slackChannel?: string;
}

export interface PickedCategories {
  [category: string]: string[];
}

export interface Result {
  selectedModulesByCategory: PickedCategories;
  selectedRisks: RiskSelection[];
  projectMetaResponses: ProjectMetaResponses;
  selectedTools: string[];
}

// Risks:
export interface RiskOption {
  text: string;
  risk?: string;
  selected?: boolean;
}

export interface Risk {
  text: string;
  description?: string;
  options: RiskOption[];
}

export interface RiskSelection {
  text: string;
  selection: string;
}

// Modules

export interface ModuleCategories {
  [category: string]: ModuleCategory;
}

export interface ModuleCategory {
  [module: string]: Module;
}

export interface Module {
  title: string;
  category: string;
  assessmentQuestion: string;
  response?: boolean; // User's response
  minimumRisk?: string;
  checkLists?: { [key: string]: CheckList[] };
  tags?: string;
  resources?: string[];
}

export interface CheckList {
  question: string;
  key?: string;
  tools?: string[];
}

interface ProjectTypes {
  name: string;
  modules?: string[];
}

export interface Tools {
  [category: string]: { [key: string]: Tool };
}

export interface Tool {
  warning?: string;
  description?: string;
  response?: boolean; // User's response
}

// Data export
export interface DirectoryData {
  data: {
    modules: ModuleCategories;
    projectMeta: ProjectMeta[];
    risks: {
      questions: Risk[];
    };
    projectTypes: ProjectTypes[];
    tooling: Tools;
  };
}

export interface DatabaseModel {
  id?: string;
  metaData: Result;
  boardLink?: string;
  createdAt?: string;
  updatedAt?: string;
}
