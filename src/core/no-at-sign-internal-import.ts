import * as utils from "../utils";
import { base } from "./base";

export const noAtSignInternalImport = utils.wrapRule({
  rule: base["disallow-import"],
  options: [{ disallow: ["@/**"] }],
  docs: {
    description: 'Disallows "@/**" import.',
    failExamples: 'import x from "@/folder";',
    passExamples: 'import x from "@";'
  }
});
