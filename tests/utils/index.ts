/* eslint-disable misc/no-at-sign-internal-import -- Ok */

import { getProjectConfig } from "@/utils/create-rule";

test.each([
  {
    expected: { name: "package-name" },
    path: "./fixtures/project-config.json"
  },
  { expected: {}, path: "./fixtures/corrupted/project-config.json" },
  { expected: {}, path: "./fixtures/missing/project-config.json" }
])("getProjectConfig", ({ expected, path }) => {
  expect(getProjectConfig(path)).toStrictEqual(expected);
});
