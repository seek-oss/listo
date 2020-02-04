const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const immutable = require('object-path-immutable');
const yaml = require('js-yaml');
import { DirectoryData } from '../../frontend/src/types';

const Ajv = require('ajv');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

async function yamlFileToJson(filePath: string) {
  try {
    const { name } = path.parse(filePath);
    // Note: the safeLoad function is delightfully robust and will correctly
    // parse JSON, and plain text files into the resulting structure.
    // This may not be desired, if so a possible work around would be to filter
    // by file extension and only process .yml or .yaml files
    return {
      [name]: await yaml.safeLoad(await readFile(filePath)),
    };
  } catch (ex) {
    console.error(`Unable to process ${filePath}`, ex);
  }
  return {};
}

async function reduceDirectory(directory: string) {
  const dirEntries = await readdir(directory, { withFileTypes: true });
  let retVal = {};

  for (const entry of dirEntries) {
    const filePath = `${directory}/${entry.name}`;
    const namespace = directory.split('/').pop();
    retVal = immutable.merge(
      retVal,
      namespace,
      entry.isDirectory()
        ? await reduceDirectory(filePath)
        : await yamlFileToJson(filePath),
    );
  }

  return retVal;
}

async function validate(schema: object, json: string): Promise<boolean> {
  var ajv = new Ajv();
  const obj = JSON.parse(json);
  var valid = ajv.validate(schema, obj);
  if (!valid) {
    console.error(ajv.errors);
    return false;
  }
  return true;
}

function validateToolMapping(json: string): boolean {
  const obj: any = JSON.parse(json);

  const { tooling, modules } = obj.data;

  const flattenedTools: any = Object.values(tooling).reduce(
    (list: any, current: any) => {
      return list.concat(...Object.keys(current));
    },
    [] as string[],
  );

  const nonMatches: string[] = [];

  const result = Object.values(modules).every(category => {
    return Object.values(category).every(mod => {
      if (!mod.checkLists) {
        return true;
      }
      return Object.values(mod.checkLists).every((checklist: any) => {
        return checklist.every(ch => {
          if (ch.tools) {
            const results = ch.tools.map((tool: any) => {
              const result = flattenedTools.includes(tool);
              if (!result) {
                nonMatches.push(tool);
              }
              return result;
            });

            return results.every(val => val);
          }
          // If no tools are listed then just return true
          return true;
        });
      });
    });
  });

  if (!result) {
    console.error(
      `TOOLING ERROR: The following keys could not be found as tools: \n\n${nonMatches.join(
        '\n',
      )}\n\n`,
    );
  }

  return result;
}

export async function combineData(
  schemaPath: string,
  dataDirectory: string,
): Promise<DirectoryData> {
  const data = JSON.stringify(await reduceDirectory(dataDirectory));
  const schema = JSON.parse(await readFile(schemaPath));
  const validSchema = await validate(schema, data);
  if (!validSchema) {
    throw new Error('invalid schema');
  }
  const validToolMapping = validateToolMapping(data);
  if (!validToolMapping) {
    throw new Error('invalid tooling');
  }
  return JSON.parse(data);
}

if (process.argv[1] === __filename) {
  (async () => {
    try {
      const [schemaPath, dataDirectory] = process.argv.slice(2);

      if (!schemaPath || !dataDirectory) {
        console.error(
          `Usage: ${process.argv[0]} <schema path> <data directory>`,
        );
        process.exit(1);
      }
      console.log(`Validating ${dataDirectory} against ${schemaPath}`);
      await combineData(schemaPath, dataDirectory);
    } catch (ex) {
      console.error('BAD CODE', ex);
      process.exit(1);
    }
  })();
}
