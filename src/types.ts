export interface ChartYaml {
  version: string;
  appVersion?: string;
}

export interface PluginConfig {
  chartPath: string;
  registryURL?: string;
  updateVersion?: boolean;
  updateAppVersion?: boolean;
}
