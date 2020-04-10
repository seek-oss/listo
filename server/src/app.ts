import appFactory from './appFactory';
import { DatabaseAdapter } from './dbAdapter';
import { combineData } from './data';
import { DatabaseType } from '../../frontend/src/types';

const PORT = process.env.LISTO_SERVER_PORT || 8000;
const DATA_DIR = process.env.DATA_DIR || '../data';
const SCHEMA_PATH = process.env.SCHEMA_PATH || '../frontend/data-schema.json';

(async function() {
  try {
    const listoData = await combineData(SCHEMA_PATH, DATA_DIR);
    if (!listoData) {
      console.log('Unable to read listo data');
      process.exit(1);
    }
    const db = new DatabaseAdapter(DatabaseType.Disk);
    await db.init();
    const server = await appFactory(db, listoData);
    server.listen(PORT);
    console.log(`listening on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Error starting program', err);
  }
})();
