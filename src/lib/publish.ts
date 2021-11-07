import type { Context } from "semantic-release";
import { PluginConfig } from "../types";

const publish = async (pluginConfig: PluginConfig, context: Context) => {
  console.log(pluginConfig);
  console.log(context);
};

export { publish };
