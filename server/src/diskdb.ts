import { promises as fs } from 'fs';
import {
  Result,
  Database,
  DatabaseType,
  DatabaseModel,
} from '../../frontend/src/types';
import * as uuid from 'uuid';

export class Disk implements Database {
  public type = DatabaseType.Disk;
  db: Map<string, DatabaseModel>;
  path = './db.json';

  async saveDB() {
    const serialiseDB = JSON.stringify(Array.from(this.db.entries()));
    await fs.writeFile(this.path, serialiseDB);
  }

  async fetchDB() {
    try {
      const file = await fs.readFile(this.path, 'utf-8');
      this.db = new Map(JSON.parse(file));
    } catch (err) {
      throw `Could not open the file ${this.path} with error: ${err}`;
    }
  }

  public async init() {
    try {
      await this.fetchDB();
    } catch (err) {
      // No database found so create a new one
      this.db = new Map();
    }
  }

  public async storeProject(projectInfo: Result): Promise<string> {
    try {
      const timestamp = new Date().getTime();
      const projectId = uuid.v4();
      const dbObject: DatabaseModel = {
        id: projectId,
        metaData: projectInfo,
        boardLink: '',
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      this.db.set(projectId, dbObject);
      await this.saveDB();

      return projectId;
    } catch (err) {
      console.error(`Can't store project: ${err}`);
      throw `Can't store project: ${err}`;
    }
  }

  public async updateProject(
    projectId: string,
    boardLink: string,
  ): Promise<string> {
    if (this.db.has(projectId)) {
      const project = this.db.get(projectId);
      project.boardLink = boardLink;
      project.updatedAt = new Date().getTime();

      this.db.set(projectId, project);
      await this.saveDB();

      return projectId;
    } else {
      throw `Can't find project with id: ${projectId}`;
    }
  }

  public async getProject(projectId: string): Promise<DatabaseModel> {
    if (this.db.has(projectId)) {
      return this.db.get(projectId);
    } else {
      throw `Can't find project with id: ${projectId}`;
    }
  }
}
