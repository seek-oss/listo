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
