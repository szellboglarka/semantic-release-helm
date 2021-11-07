import type { Context } from "semantic-release";
import { verifyConditions as verifyConditionsInternal } from "./lib/verifyConditions";
import { prepare as prepareInternal } from "./lib/prepare";
import { publish as publishInternal } from "./lib/publish";

let verified = false;
let prepared = false;

async function verifyConditions(pluginConfig: any, context: Context) {
  await verifyConditionsInternal(pluginConfig, context);
  verified = true;
}

async function prepare(pluginConfig: any, context: Context) {
  if (!verified) {
    await verifyConditions(pluginConfig, context);
  }

  await prepareInternal(pluginConfig, context);
  prepared = true;
}

async function publish(pluginConfig: any, context: Context) {
  if (!verified) {
    await verifyConditions(pluginConfig, context);
  }
  if (!prepared) {
    await prepare(pluginConfig, context);
  }

  await publishInternal(pluginConfig, context);
}

export { verifyConditions, prepare, publish };
