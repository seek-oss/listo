import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { dynamoConfigOptions, tableName } from './config';
import { Repository } from './types';
import { DatabaseModel } from '../../frontend/src/types';

export class Dynamo implements Repository {
  db: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.db = new AWS.DynamoDB.DocumentClient(dynamoConfigOptions);
  }

  public async init() {
    if (process.env.CREATE_DYNAMO_TABLES) {
      const params = {
        TableName: tableName,
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };

      const dynamoClient = new AWS.DynamoDB(dynamoConfigOptions);
      console.debug('dynamo config: ', dynamoConfigOptions);
      await dynamoClient.createTable(params).promise();
      const data = await dynamoClient.listTables().promise();
      console.log('Created table.', JSON.stringify(data, null, 2));
    }
  }

  public async create(project: DatabaseModel): Promise<string> {
    const timestamp = new Date().getTime();
    const projectId = uuid.v4();

    project.id = projectId;
    project.boardLink = null;
    project.createdAt = timestamp;
    project.updatedAt = timestamp;

    const params = {
      TableName: tableName,
      Item: project,
    };

    await this.db.put(params).promise();
    return projectId;
  }

  public async update(projectId: string, boardLink: string): Promise<string> {
    const params = {
      TableName: tableName,
      Key: {
        id: projectId,
      },
      UpdateExpression: 'set boardLink = :link, updatedAt = :time',
      ExpressionAttributeValues: {
        ':link': boardLink,
        ':time': new Date().getTime(),
      },
      ReturnValues: 'UPDATED_NEW',
    };

    const resp = await this.db.update(params).promise();
    console.log('Successfully updated item', JSON.stringify(resp));
    return projectId;
  }

  public async get(projectId: string): Promise<DatabaseModel> {
    const params = {
      TableName: tableName,
      Key: {
        id: projectId,
      },
    };

    const data = await this.db.get(params).promise();

    if (!data.Item) {
      throw 'Project not found';
    }

    return <DatabaseModel>data.Item;
  }
}
