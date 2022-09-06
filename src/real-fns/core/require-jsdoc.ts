import * as utils from "../../utils";
import { core } from "../../core";
import { evaluate } from "real-fns";

export const requireJsdoc = evaluate(() => {
  const prefix =
    ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";

  return utils.wrapRule({
    rule: core["require-jsdoc"],
    options: [
      {
        includeSelectors: [
          `${prefix} > ArrowFunctionExpression`,
          `${prefix} > FunctionExpression`,
          `${prefix} > ObjectExpression > Property > ArrowFunctionExpression`,
          `${prefix} > ObjectExpression > Property > FunctionExpression`
        ],
        noDefaultSelectors: true
      }
    ]
  });
});
