import * as utils from "../utils";
import { core } from "./core";

export const noUnnecessaryAsConst = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Unnecessary "as const"',
      selector: [
        "VariableDeclarator > TSAsExpression[expression.properties.length=0] > TSTypeReference > Identifier[name=const]",
        "VariableDeclarator[id.typeAnnotation] > TSAsExpression > TSTypeReference > Identifier[name=const]"
      ]
    }
  ],
  docs: {
    description: 'Disallows unnecessary "as const".',
    failExamples: `
      const x = {} as const;
      const y: I = { value: 1 } as const;
    `,
    passExamples: "const x = { value: 1 } as const;"
  }
});
