import { DatabaseModel } from '../../frontend/src/types';

export interface Repository {
  init: () => Promise<void>;
  create: (project: DatabaseModel) => Promise<string>;
  update: (projectId: string, boardLink: string) => Promise<string>;
  find: (projectId: string) => Promise<DatabaseModel>;
}
