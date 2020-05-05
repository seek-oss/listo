import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import appFactory from './appFactory';
import { combineData } from './data';
import { Disk } from './diskdb';
import { Dynamo } from './dynamodb';
import { Repository } from './types';
import { region } from './config';

const DATA_DIR = process.env.DATA_DIR || '../data';
const SCHEMA_PATH = process.env.SCHEMA_PATH || '../frontend/data-schema.json';
const PORT = process.env.PORT || 8000;

(async function() {
  try {
    const listoData = await combineData(SCHEMA_PATH, DATA_DIR);
    if (!listoData) {
      console.log('Unable to read listo data');
      process.exit(1);
    }

    // "Disk" is the default database.
    let db: Repository;

    if (process.env.LISTO_DATABASE === 'Dynamo') {
      const dynamoConfigOptions: ServiceConfigurationOptions = {
        region: region,
        endpoint: process.env.DYNAMO_DB_ENDPOINT,
      };

      db = new Dynamo(dynamoConfigOptions, process.env.DYNAMODB_TABLE);
    } else {
      db = new Disk(process.env.DISK_PATH);
    }

    await db.init();

    const server = await appFactory(db, listoData);
    server.listen(PORT);
    console.log(`listening on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Error starting program', err);
  }
})();
