import appFactory from './appFactory';
import { combineData } from './data';
import { Disk } from './diskdb';
import { Dynamo } from './dynamodb';
import { port } from './config';
import { Repository } from './types';

const DATA_DIR = process.env.DATA_DIR || '../data';
const SCHEMA_PATH = process.env.SCHEMA_PATH || '../frontend/data-schema.json';

(async function() {
  try {
    const listoData = await combineData(SCHEMA_PATH, DATA_DIR);
    if (!listoData) {
      console.log('Unable to read listo data');
      process.exit(1);
    }

    // Disk is the default database
    let db: Repository;
    
    if (process.env.LISTO_DATABASE === 'Dynamo') {
        db = new Dynamo();
    } else {
        db = new Disk();
    }

    if (process.env.LISTO_DATABASE === 'Dynamo') {
      db = new Dynamo();
    }

    await db.init();

    const server = await appFactory(db, listoData);
    server.listen(port);
    console.log(`listening on http://localhost:${port}`);
  } catch (err) {
    console.error('Error starting program', err);
  }
})();
