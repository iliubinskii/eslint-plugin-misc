import { utils } from "@";

test.each([
  {
    core: { aaa: "ccc" },
    expected: { "aaa/bbb": "ccc" },
    path: "./fixtures/eslintrc.synonyms.js"
  },
  { core: {}, expected: {}, path: "./fixtures/missing/eslintrc.synonyms.js" }
])("getSynonyms", ({ core, expected, path }) => {
  expect(utils.getSynonyms(path, core)).toStrictEqual(expected);
});
