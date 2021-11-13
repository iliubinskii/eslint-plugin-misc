import * as utils from "../utils";
import { core } from "./core";

export const noNodejsModules = utils.wrapRule({
  rule: core["disallow-import"],
  options: [{ disallow: ["node:*"] }],
  docs: {
    description: "Disallows importing NodeJS modules.",
    failExamples: 'import x from "node:fs";',
    passExamples: 'import x from "fs";'
  }
});
