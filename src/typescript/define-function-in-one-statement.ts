import * as utils from "../utils";
import { core } from "./core";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
export const defineFunctionInOneStatement = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message:
        'Use "Object.assign" to define function properties in one statement',
      selector:
        "AssignmentExpression > MemberExpression.left > Identifier.object",
      typeIs: utils.TypeGroup.function
    }
  ],
  docs: {
    description: "Requires that function is defined in one statement.",
    failExamples: `
      function f() {}
      f.x = 1;
    `,
    passExamples: "const f = Object.assign(() => {}, { x: 1 });"
  }
});
