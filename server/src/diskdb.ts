import { Result, Database, DatabaseType } from '../../frontend/src/types';

export class Disk implements Database {
  public type = DatabaseType.Disk;

  public async createTable() {
    //TODO
  }

  public async storeProject(projectInfo: Result): Promise<string> {
    //TODO
    return new Promise(() => {
      return projectInfo;
    });
  }

  public async updateProject(
    projectId: string,
    boardLink: string,
  ): Promise<string> {
    //TODO
    return new Promise(() => {
      return projectId + boardLink;
    });
  }

  public async getProject(projectId: string): Promise<string> {
    //TODO
    return new Promise(() => {
      return projectId;
    });
  }
}
