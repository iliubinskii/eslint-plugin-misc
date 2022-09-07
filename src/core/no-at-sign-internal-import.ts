import * as utils from "../utils";
import { base } from "./base";

// eslint-disable-next-line misc/max-identifier-blocks -- Ok
export const noAtSignInternalImport = utils.wrapRule({
  rule: base["disallow-import"],
  options: [{ disallow: ["@/**"] }],
  docs: {
    description: 'Disallows "@/**" import.',
    failExamples: 'import x from "@/folder";',
    passExamples: 'import x from "@";'
  }
});
