/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { evaluate } from "@skylib/functions";
import { misc } from "../../misc";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
export const requireReturnInDefineFn = evaluate(() => {
  const prefix =
    ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";

  return utils.wrapRule({
    rule: misc["no-restricted-syntax"],
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
