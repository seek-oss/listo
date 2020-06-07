import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { Repository } from './types';
import {
  ProjectModel,
  QuickChecklistModel,
  isValidProject,
  isValidQuickChecklist,
} from '../../frontend/src/types';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

export class Dynamo implements Repository {
  db: AWS.DynamoDB.DocumentClient;
  tableName: string;
  dynamoConfigOptions: ServiceConfigurationOptions;

  constructor(
    dynamoConfigOptions: ServiceConfigurationOptions,
    tableName: string,
  ) {
    this.dynamoConfigOptions = dynamoConfigOptions;
    this.dynamoConfigOptions.region =
      dynamoConfigOptions.region || 'ap-southeast-2';
    this.tableName = tableName || 'Projects';
    this.db = new AWS.DynamoDB.DocumentClient(this.dynamoConfigOptions);
  }

  public async init() {
    if (
      process.env.LISTO_DATABASE === 'Dynamo' &&
      process.env.CREATE_DYNAMO_TABLES
    ) {
      const params = {
        TableName: this.tableName,
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };

      const dynamoClient = new AWS.DynamoDB(this.dynamoConfigOptions);
      console.debug('dynamo config: ', this.dynamoConfigOptions);
      await dynamoClient.createTable(params).promise();
      const data = await dynamoClient.listTables().promise();
      console.log('Created table.', JSON.stringify(data, null, 2));
    }
  }

  public async create(project: ProjectModel): Promise<string> {
    const date = new Date().toISOString();
    const projectId = uuid.v4();

    project.id = projectId;
    project.boardLink = null;
    project.createdAt = date;
    project.updatedAt = date;

    const params = {
      TableName: this.tableName,
      Item: project,
    };

    await this.db.put(params).promise();
    return projectId;
  }

  public async update(projectId: string, boardLink: string): Promise<string> {
    const params = {
      TableName: this.tableName,
      Key: {
        id: projectId,
      },
      UpdateExpression: 'set boardLink = :link, updatedAt = :time',
      ExpressionAttributeValues: {
        ':link': boardLink,
        ':time': new Date().toISOString(),
      },
      ReturnValues: 'UPDATED_NEW',
    };

    const resp = await this.db.update(params).promise();
    console.log('Successfully updated item', JSON.stringify(resp));
    return projectId;
  }

  public async get(projectId: string): Promise<ProjectModel> {
    const params = {
      TableName: this.tableName,
      Key: {
        id: projectId,
      },
    };

    const data = await this.db.get(params).promise();
    const project = <ProjectModel>data.Item;

    if (!isValidProject(project)) {
      throw 'Project not found';
    }

    return project;
  }

  public async getQuickChecklist(id: string): Promise<QuickChecklistModel> {
    const params = {
      TableName: this.tableName,
      Key: {
        id: id,
      },
    };

    const data = await this.db.get(params).promise();
    const quickChecklist = <QuickChecklistModel>data.Item;

    if (!isValidQuickChecklist(quickChecklist)) {
      throw 'Checklist not found';
    }

    return quickChecklist;
  }

  public async upsertQuickChecklist(
    quickChecklist: QuickChecklistModel,
  ): Promise<string> {
    const date = new Date().toISOString();
    const params = {
      TableName: this.tableName,
      Item: quickChecklist,
    };

    try {
      await this.getQuickChecklist(quickChecklist.id);
    } catch (err) {
      // Create a new QuickChecklist
      const id = uuid.v4();
      quickChecklist.id = id;
      quickChecklist.createdAt = date;
    }

    quickChecklist.updatedAt = date;
    await this.db.put(params).promise();

    return quickChecklist.id;
  }
}
