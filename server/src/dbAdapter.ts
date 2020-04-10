import { Dynamo } from './dynamodb';
import { Disk } from './diskdb';
import { Result, DatabaseType, Database } from '../../frontend/src/types';

export class DatabaseAdapter implements Database {
  public type: DatabaseType;
  db: Database;

  constructor(type: DatabaseType) {
    this.type = type;

    if (this.type === DatabaseType.Dynamo) {
      this.db = <Dynamo>new Dynamo();
    } else if (this.type === DatabaseType.Disk) {
      this.db = <Disk>new Disk();
    } else {
      throw new Error('Invalid Database Type');
    }
  }

  public async init() {
    await this.db.init();
  }

  public async storeProject(projectInfo: Result) {
    return await this.db.storeProject(projectInfo);
  }

  public async updateProject(projectId: string, boardLink: string) {
    return await this.db.updateProject(projectId, boardLink);
  }

  public async getProject(projectId: string) {
    return await this.db.getProject(projectId);
  }
}
