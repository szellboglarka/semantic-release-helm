import { promises as fsPromises } from "fs";
import type { Context } from "semantic-release";
import * as yaml from "js-yaml";
import { prepare } from "../src/lib/prepare";
import { createMockContext, MockContext } from "./context";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  ctx.nextRelease = {
    type: "major",
    gitHead: "",
    version: "13.0.0",
    gitTag: "",
    notes: "",
  };
});

test("should update version and appVersion with default settings", async () => {
  let result;

  const spy = jest.spyOn(fsPromises, "writeFile").mockImplementation((file, data) => {
    result = data;
    return Promise.resolve();
  });

  await prepare({ chartPath: "./test/fixtures/chart" }, ctx);

  expect(result).toBe(
    yaml.dump({
      apiVersion: "v2",
      name: "test",
      description: "A Helm chart for Kubernetes",
      type: "application",
      version: "13.0.0",
      appVersion: "13.0.0",
    }),
  );

  spy.mockRestore();
});

test("should only update version with updateAppVersion === false", async () => {
  let result;

  const spy = jest.spyOn(fsPromises, "writeFile").mockImplementation((file, data) => {
    result = data;
    return Promise.resolve();
  });

  await prepare({ chartPath: "./test/fixtures/chart", updateAppVersion: false }, ctx);

  expect(result).toBe(
    yaml.dump({
      apiVersion: "v2",
      name: "test",
      description: "A Helm chart for Kubernetes",
      type: "application",
      version: "13.0.0",
      appVersion: "1.16.0",
    }),
  );

  spy.mockRestore();
});

test("should only update appVersion with updateVersion === false", async () => {
  let result;

  const spy = jest.spyOn(fsPromises, "writeFile").mockImplementation((file, data) => {
    result = data;
    return Promise.resolve();
  });

  await prepare({ chartPath: "./test/fixtures/chart", updateVersion: false }, ctx);

  expect(result).toBe(
    yaml.dump({
      apiVersion: "v2",
      name: "test",
      description: "A Helm chart for Kubernetes",
      type: "application",
      version: "0.1.0",
      appVersion: "13.0.0",
    }),
  );

  spy.mockRestore();
});

test("should update nothing with updateVersion === false and updateAppVersion === false", async () => {
  let result;

  const spy = jest.spyOn(fsPromises, "writeFile").mockImplementation((file, data) => {
    result = data;
    return Promise.resolve();
  });

  await prepare({ chartPath: "./test/fixtures/chart", updateVersion: false, updateAppVersion: false }, ctx);

  expect(result).toBe(
    yaml.dump({
      apiVersion: "v2",
      name: "test",
      description: "A Helm chart for Kubernetes",
      type: "application",
      version: "0.1.0",
      appVersion: "1.16.0",
    }),
  );

  spy.mockRestore();
});
