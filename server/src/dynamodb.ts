import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { Result, DatabaseType, Database } from '../../frontend/src/types';
import { dynamoConfigOptions, tableName } from './config';

export class Dynamo implements Database {
  public type = DatabaseType.Dynamo;
  dynamoDb: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfigOptions);
  }

  public async createTable() {
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

      try {
        const dynamoClient = new AWS.DynamoDB(dynamoConfigOptions);
        console.log('dynamo config: ', dynamoConfigOptions);
        await dynamoClient.createTable(params).promise();
        const data = await dynamoClient.listTables().promise();
        console.log('Created table.', JSON.stringify(data, null, 2));
      } catch (err) {
        if (err.message != 'Cannot create preexisting table')
          console.log(`Unable to create table:`, err.message);
      }
    }
  }

  public async storeProject(projectInfo: Result): Promise<string> {
    try {
      const timestamp = new Date().getTime();
      const projectId = uuid.v4();
      const params = {
        TableName: tableName,
        Item: {
          id: projectId,
          metaData: projectInfo,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      };

      await this.dynamoDb.put(params).promise();

      return projectId;
    } catch (err) {
      console.log(
        `Unable to put project into DynamoDB`,
        JSON.stringify(projectInfo),
        err,
      );
      throw err;
    }
  }

  public async updateProject(
    projectId: string,
    boardLink: string,
  ): Promise<string> {
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

    try {
      const resp = await this.dynamoDb.update(params).promise();
      console.log('Successfully updated item', JSON.stringify(resp));
      return projectId;
    } catch (err) {
      console.log(`Unable to update listoProject with id ${projectId}`, err);
      throw err;
    }
  }

  public async getProject(projectId: string): Promise<string> {
    try {
      const params = {
        TableName: tableName,
        Key: {
          id: projectId,
        },
      };

      const data = await this.dynamoDb.get(params).promise();
      if (!Object.keys(data).length) {
        throw 'Project not found';
      }

      return JSON.stringify(data, null, 2);
    } catch (err) {
      console.log(
        `Unable to get ${projectId} from ${tableName} Dynamo table`,
        err,
      );
      throw err;
    }
  }
}
