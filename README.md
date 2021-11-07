# semantic-release-helm

This is a plugin for _semantic-release_. It updates `version` and `appVersion` of a [Helm](https://helm.sh/) chart's
_Chart.yaml_.

## BREAKING CHANGES

##### v3

- The entire plugin has been rewritten with TypeScript, proper linting and tests. Some configuration options have been renamed.
- `version` and `appVersion` are set to the value from _semantic-release_, there is no `semver.increase` for `version` any more.
- Only Helm >3.8.0 is supported for OCI-based registries.

##### v2

- `path` has been renamed to `chartPath` to prevent conflicts.

## Configuration

- chartPath (required) - string
  Chart directory, where the _Chart.yaml_ is located.

- registryURL (optional) - string  
  URI of a container registry.

- updateVersion (optional) - boolean (default: true)  
  Update the field `version`.

- updateAppVersion (optional) - boolean (default: true)  
  Update the field `appVersion`.

Pass credentials through environment variables accordingly:

```
export REGISTRY_USERNAME=<USERNAME>
export REGISTRY_PASSWORD=<PASSWORD>
```

For S3 pass the AWS credentials as environment variables:

```
export AWS_REGION=<REGION>
export AWS_ACCESS_KEY_ID=<ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<SECRET_ACCESS_KEY>
```

## Example

This will update `version` and `appVersion` in `./chart/Chart.yaml`
and push the chart to `localhost:5000/repo/chart`. The image will be tagged with the value of `version` from
_Chart.yaml_.

```
{
  "plugins": [
    [
      "semantic-release-helm",
      {
        chartPath: './chart',
        registry: 'localhost:5000/repo/chart'
      }
    ]
  ]
}
```

## S3 Example

The [helm-s3](https://github.com/hypnoglow/helm-s3) plugin adds support for S3. Check the documentation for additional
options.

This will update `version` in `./chart/Chart.yaml`
and push the chart to `s3://my-s3-bucket/s3-prefix`. The image will be tagged with the value of `version` from
_Chart.yaml_.

```
{
  "plugins": [
    [
      "semantic-release-helm",
      {
        chartPath: './chart',
        registry: 's3://my-s3-bucket-repo/s3-prefix',
        updateAppVersion: false,
      }
    ]
  ]
}
```
