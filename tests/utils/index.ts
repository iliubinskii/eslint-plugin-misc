// eslint-disable-next-line @skylib/no-at-sign-internal-import, @skylib/no-internal-modules -- Ok
import { getProjectConfig } from "@/utils/create-rule.internal";

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
