/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";
import { evaluate } from "typescript-misc";

// eslint-disable-next-line misc/max-identifier-blocks -- Ok
export const requireReturnInDefineFn = evaluate(() => {
  const prefix =
    ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";

  return utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
      {
        message: "Missing return type",
        selector: [
          `${prefix} > ArrowFunctionExpression[returnType=undefined]`,
          `${prefix} > FunctionExpression[returnType=undefined]`,
          `${prefix} > ObjectExpression > Property > ArrowFunctionExpression[returnType=undefined]`,
          `${prefix} > ObjectExpression > Property > FunctionExpression[returnType=undefined]`
        ]
      }
    ]
  });
});
