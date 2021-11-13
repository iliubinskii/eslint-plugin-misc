import * as utils from "../utils";
import { core } from "./core";

export const noUnsafeObjectAssign = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Do not assign to readonly object",
      selector:
        "CallExpression[callee.object.name=Object][callee.property.name=assign] > Identifier.arguments:first-child",
      typeIs: utils.TypeGroup.readonly
    }
  ],
  docs: {
    description: 'Disallows unsafe "Object.assign".',
    failExamples: `
      const x = { value: 1 } as const;

      Object.assign(x, { value: 2 });
    `,
    passExamples: `
      const x = { value: 1 };

      Object.assign(x, { value: 2 });
    `
  }
});
