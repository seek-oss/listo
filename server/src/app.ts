import * as AWS from 'aws-sdk';
import appFactory from './appFactory';
import { dynamoConfigOptions, tableName } from './config';
import { combineData } from './data';

const PORT = process.env.LISTO_SERVER_PORT || 8000;
const DATA_DIR = process.env.DATA_DIR || '../data';
const SCHEMA_PATH = process.env.SCHEMA_PATH || '../frontend/data-schema.json';

async function createDB(client: AWS.DynamoDB) {
  try {
    const params = {
      TableName: tableName,
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    await client.createTable(params).promise();

    const data = await client.listTables().promise();
    console.log('Created table.', JSON.stringify(data, null, 2));
  } catch (err) {
    if (err.message != 'Cannot create preexisting table')
      console.log(`Unable to create table:`, err.message);
  }
}

(async function() {
  try {
    const documentClient = new AWS.DynamoDB.DocumentClient(dynamoConfigOptions);
    const listoData = await combineData(SCHEMA_PATH, DATA_DIR);
    if (!listoData) {
      console.log('Unable to read listo data');
      process.exit(1);
    }

    const server = await appFactory(documentClient, listoData);
    server.listen(PORT);
    console.log(`listening on http://localhost:${PORT}`);

    if (process.env.CREATE_DYNAMO_TABLES) {
      const dynamoClient = new AWS.DynamoDB(dynamoConfigOptions);
      console.log('dynamo config: ', dynamoConfigOptions);
      await createDB(dynamoClient);
    }
  } catch (err) {
    console.error('Error starting program', err);
  }
})();
