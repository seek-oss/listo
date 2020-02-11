import fetch from 'node-fetch';
import * as AWS from 'aws-sdk';
import { region } from './config';

const WEBHOOK_SECRET_ID = process.env.WEBHOOK_SECRET_ID;

const sm = new AWS.SecretsManager({ region });
const getSecretParams: AWS.SecretsManager.GetSecretValueRequest = {
  SecretId: WEBHOOK_SECRET_ID,
};

let cachedSecretResponse: AWS.SecretsManager.GetSecretValueResponse | undefined;

async function getSlackWebHook() {
  if (process.env.SLACK_WEB_HOOK) {
    return process.env.SLACK_WEB_HOOK;
  }

  // avoid looking up the secret every time
  cachedSecretResponse =
    cachedSecretResponse ||
    (await sm.getSecretValue(getSecretParams).promise());

  const parsedSecrets = JSON.parse(cachedSecretResponse.SecretString);
  return parsedSecrets.slack;
}

export async function sendMessage(message: string): Promise<any> {
  const {
    SLACK_WEB_HOOK,
    WEBHOOK_SECRET_ID,
    SLACK_TARGET_CHANNEL,
  } = process.env;
  if (!SLACK_WEB_HOOK && !WEBHOOK_SECRET_ID) {
    console.log(`Slack alert ${prepareSlackMessage(message)}`);
    return;
  }

  const slackRequest = {
    channel: SLACK_TARGET_CHANNEL,
    username: 'Listo Bot',
    text: prepareSlackMessage(message),
  };

  const slackWebHook = await getSlackWebHook();

  return await fetch(slackWebHook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slackRequest),
  });
}

/**
 * Converts a listo notification message into a string that displays nicely in Slack
 */
function prepareSlackMessage(message: string): string {
  function flatten(messageToParse: object, indent: number): string {
    let text = '\n';
    for (const prop in messageToParse) {
      if (typeof messageToParse[prop] === 'object') {
        text += flatten(messageToParse[prop], indent + 1);
      } else {
        text += `${' '.repeat(indent)}${prop} : ${messageToParse[prop]} \n`;
      }
    }
    return text;
  }

  // recursively flatten to cover nested objects
  return flatten(JSON.parse(message), 0);
}
