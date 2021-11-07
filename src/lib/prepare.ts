import type { Context } from "semantic-release";
import * as path from "path";
import { promises as fsPromises } from "fs";
import * as yaml from "js-yaml";
import { ChartYaml, PluginConfig } from "../types";

const prepare = async ({ chartPath, updateVersion = true, updateAppVersion = true }: PluginConfig, context: Context) => {
  const chartFile = await fsPromises.readFile(path.join(chartPath, "Chart.yaml"), { encoding: "utf-8" });

  let chartYaml = yaml.load(chartFile) as unknown as ChartYaml;

  if (!context.nextRelease?.version) {
    context.logger.log("Version not set in semantic-release, skipping update.");
    return;
  }

  const { version } = context.nextRelease;

  if (updateVersion === true) {
    context.logger.log("Updating Chart.yaml with version %s.", version);
    chartYaml = { ...chartYaml, version } as ChartYaml;
  }

  if (updateAppVersion === true) {
    context.logger.log("Updating Chart.yaml with appVersion %s.", version);
    chartYaml = { ...chartYaml, appVersion: version } as ChartYaml;
  }

  await fsPromises.writeFile(chartPath, yaml.dump(chartYaml));
};

export { prepare };
