import * as utils from "../utils";
import { core } from "./core";

export const preferConstRequire = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Assign "require" to const',
      selector:
        ":not(VariableDeclarator) > CallExpression > Identifier.callee[name=require]"
    }
  ],
  docs: {
    description: 'Requires "require()" to be assigned to variable.',
    failExamples: 'function f() { return require("node:path"); }',
    passExamples: 'const path = require("node:path");'
  }
});
