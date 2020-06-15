import { ProjectModel, QuickChecklistModel } from '../../frontend/src/types';

export interface Repository {
  init: () => Promise<void>;
  create: (project: ProjectModel) => Promise<string>;
  update: (projectId: string, boardLink: string) => Promise<string>;
  get: (projectId: string) => Promise<ProjectModel>;
  getQuickChecklist: (id: string) => Promise<QuickChecklistModel>;
  upsertQuickChecklist: (
    quickchecklist: QuickChecklistModel,
  ) => Promise<string>;
}

export const isValidProject = (
  projectOrChecklist?: ProjectModel | QuickChecklistModel,
): projectOrChecklist is ProjectModel => {

  if(!projectOrChecklist) return false;

  if ((projectOrChecklist as ProjectModel).metaData) {
    return true;
  }

  return false;
};

export const isValidQuickChecklist = (
  projectOrChecklist?: ProjectModel | QuickChecklistModel,
): projectOrChecklist is QuickChecklistModel => {

  if(!projectOrChecklist) return false;

  if ((projectOrChecklist as QuickChecklistModel).checkList) {
    return true;
  }

  return false;
};