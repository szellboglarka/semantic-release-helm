import type { Context } from "semantic-release";
import { PluginConfig } from "../types";

const verifyConditions = async (pluginConfig: PluginConfig, context: Context) => {
  console.log(pluginConfig);
  console.log(context);
};

export { verifyConditions };
