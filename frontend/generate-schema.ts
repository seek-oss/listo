import * as TJS from 'typescript-json-schema';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

(async () => {
  try {
    const settings: TJS.PartialArgs = {
      required: true,
      noExtraProps: true,
    };

    const program = TJS.getProgramFromFiles([
      path.join(__dirname, 'src/types/index.ts'),
    ]);
    const schema = TJS.generateSchema(program, 'DirectoryData', settings);
    await writeFile(
      path.join(__dirname, 'data-schema.json'),
      JSON.stringify(schema),
    );
  } catch (ex) {
    console.error('BAD CODE', ex);
    process.exit(1);
  }
})();
