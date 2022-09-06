import * as utils from "../utils";
import { base } from "./base";

export const restrictIdentifierCharacters = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "Identifier must consist of english characters and dollar sign",
      selector: "Identifier[name=/[^$\\w]/u]"
    }
  ],
  docs: {
    description: 'Requires "require()" to be assigned to variable.',
    failExamples: 'function f() { return require("node:path"); }',
    passExamples: 'const path = require("node:path");'
  }
});
