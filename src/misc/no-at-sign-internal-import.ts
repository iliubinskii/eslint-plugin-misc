import * as utils from "../utils";
import { core } from "./core";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
export const noAtSignInternalImport = utils.wrapRule({
  rule: core["disallow-import"],
  options: [{ disallow: ["@/**"] }],
  docs: {
    description: 'Disallows "@/**" import.',
    failExamples: 'import x from "@/folder";',
    passExamples: 'import x from "@";'
  }
});
