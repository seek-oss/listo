import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

// Listo Server options
export const port = process.env.LISTO_SERVER_PORT || 8000;

// Dynamo Config options
export const region = 'ap-southeast-2';
export const tableName = process.env.DYNAMODB_TABLE || 'Boards';
export const dynamoConfigOptions: ServiceConfigurationOptions = {
  region: region,
  endpoint: process.env.DYNAMO_DB_ENDPOINT,
};

// Disk database options
export const diskPath = process.env.DISK_PATH || './db.json';
