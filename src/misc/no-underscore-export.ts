import * as utils from "../utils";
import { core } from "./core";

export const noUnderscoreExport = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "No underscore exports",
      selector: [
        "ExportNamedDeclaration > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature) > Identifier.id[name=/^_/u]",
        "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
      ]
    }
  ],
  docs: {
    description: "Disallows underscore export.",
    failExamples: `
      export const _x = 1;
      export function _f() {}

    `,
    passExamples: `
      export const x = 1;
      export function f() {}
    `
  }
});
