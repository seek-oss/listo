import { promises as fs } from 'fs';
import * as uuid from 'uuid';
import { Repository } from './types';
import { DatabaseModel } from '../../frontend/src/types';
import * as lockfile from 'proper-lockfile';

export class Disk implements Repository {
  db: Map<string, DatabaseModel>;
  diskPath: string;

  constructor(diskPath: string) {
    this.diskPath = diskPath || './db.json';
  }

  async saveDB() {
    const options = { stale: 5000, retries: 2 };
    const release = await lockfile.lock(this.diskPath, options);
    const serialiseDB = JSON.stringify(Array.from(this.db.entries()));
    await fs.writeFile(this.diskPath, serialiseDB);
    await release();
  }

  async fetchDB() {
    const file = await fs.readFile(this.diskPath, 'utf-8');
    this.db = new Map(JSON.parse(file));
  }

  public async init() {
    try {
      await this.fetchDB();
      console.log(
        `A Disk database was found here: ${this.diskPath}. Loading it now...`,
      );
    } catch (err) {
      this.db = new Map();
      console.debug(`${err}`);
      console.log(
        `No Disk database found. Creating one here: ${this.diskPath}`,
      );
      await fs.writeFile(this.diskPath, '');
    }
  }

  public async create(project: DatabaseModel): Promise<string> {
    const date = new Date().toISOString();
    const projectId = uuid.v4();

    project.id = projectId;
    project.boardLink = '';
    project.createdAt = date;
    project.updatedAt = date;

    this.db.set(projectId, project);
    await this.saveDB();

    return projectId;
  }

  public async update(projectId: string, boardLink: string): Promise<string> {
    const project = this.db.get(projectId);

    if (!project) {
      throw `Can't find project with id: ${projectId}`;
    }
    project.boardLink = boardLink;
    project.updatedAt = new Date().toISOString();

    this.db.set(projectId, project);
    await this.saveDB();

    return projectId;
  }

  public async get(projectId: string): Promise<DatabaseModel> {
    const project = this.db.get(projectId);

    if (!project) {
      throw `Can't find project with id: ${projectId}`;
    }

    return project;
  }
}
