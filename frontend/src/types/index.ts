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

export interface AssessmentResult {
  selectedModulesByCategory: PickedCategories;
  selectedRisks: RiskSelection[];
  projectMetaResponses: ProjectMetaResponses;
  selectedMaturity: MaturitySelection[];
  selectedTools: string[];
}

export interface Maturity {
  text: string;
  description?: string;
  options: MaturityOption[];
}

export interface MaturityOption {
  text: string;
  maturity?: string;
  selected?: boolean;
}

export interface MaturitySelection {
  text: string;
  selection: string;
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
  guidance?: string;
  response?: boolean; // User's response
  minimumRisk?: string;
  checkLists: Checklists;
  tags?: string;
  resources?: string[];
}

export interface Checklists {
  [checklistName: string]: ChecklistItem[];
}

export interface ChecklistItem {
  question: string;
  key?: string;
  tools?: string[];
  checked?: boolean; // User's response
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
    maturity: {
      questions: Maturity[];
    };
  }
}

export interface DatabaseModel {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectModel extends DatabaseModel {
  metaData: AssessmentResult;
  boardLink?: string; // Trello Board URL
}

export interface QuickChecklistModel extends DatabaseModel{
  checkList: Checklists;
  projectId?: string; // We might use this in the future to link quick checklists to projects.
}