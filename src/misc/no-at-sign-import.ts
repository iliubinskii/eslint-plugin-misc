import * as utils from "../utils";
import { core } from "./core";

export const noAtSignImport = utils.wrapRule({
  rule: core["disallow-import"],
  options: [{ disallow: ["@"] }],
  docs: {
    description: 'Disallows "@" import.',
    failExamples: 'import x from "@";',
    passExamples: 'import x from "@/folder";'
  }
});
