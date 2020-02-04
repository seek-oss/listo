import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

export const region = 'ap-southeast-2';
export const tableName = process.env.DYNAMODB_TABLE || 'Boards';
export const debug = process.env.DEBUG || false;

export const dynamoConfigOptions: ServiceConfigurationOptions = {
  region: region,
  endpoint: process.env.DYNAMO_DB_ENDPOINT,
};
