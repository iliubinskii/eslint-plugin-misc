import * as utils from "../../utils";
import { evaluate } from "@skylib/functions";
import { misc } from "../../misc";

export const requireJsdoc = evaluate(() => {
  const prefix =
    ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";

  return utils.wrapRule({
    rule: misc["require-jsdoc"],
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
