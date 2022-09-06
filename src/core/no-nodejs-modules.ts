import * as utils from "../utils";
import { base } from "./base";

export const noNodejsModules = utils.wrapRule({
  rule: base["disallow-import"],
  options: [{ disallow: ["node:*"] }],
  docs: {
    description: "Disallows importing NodeJS modules.",
    failExamples: 'import x from "node:fs";',
    passExamples: 'import x from "fs";'
  }
});
