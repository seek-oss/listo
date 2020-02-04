import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { tableName } from './config';
import { Result } from '../../frontend/src/types';

export async function storeProject(
  dynamoDb: AWS.DynamoDB.DocumentClient,
  projectInfo: Result,
): Promise<string> {
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

    await dynamoDb.put(params).promise();

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

export async function updateProject(
  dynamoDb: AWS.DynamoDB.DocumentClient,
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
    const resp = await dynamoDb.update(params).promise();
    console.log('Successfully updated item', JSON.stringify(resp));
    return projectId;
  } catch (err) {
    console.log(`Unable to update listoProject with id ${projectId}`, err);
    throw err;
  }
}

export async function getProject(
  dynamoDb: AWS.DynamoDB.DocumentClient,
  projectId: string,
): Promise<string> {
  try {
    const params = {
      TableName: tableName,
      Key: {
        id: projectId,
      },
    };

    const data = await dynamoDb.get(params).promise();
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

export async function listAllBoards(
  dynamoDb: AWS.DynamoDB.DocumentClient,
): Promise<string> {
  try {
    const params = {
      TableName: tableName,
    };

    const data = await dynamoDb.scan(params).promise();
    console.log(JSON.stringify(data));
    return JSON.stringify(data);
  } catch (err) {
    console.log(`Unable to get items from ${tableName} Dynamo table`, err);
    throw err;
  }
}
