import * as utils from "../utils";
import { base } from "./base";

export const preferReadonlyArray = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "Prefer readonly array",
      selector: [
        ":not(TSTypeOperator[operator=readonly]) > :matches(TSArrayType, TSTupleType)",
        "TSTypeReference > Identifier[name=Array]"
      ]
    }
  ],
  docs: {
    description: "Disallows writable arrays.",
    failExamples: `
      function f(x: string[]) {}
      function g(x: [string]) {}
      function h(x: Array<string>) {}
    `,
    passExamples: `
      function f(x: readonly string[]) {}
      function g(x: readonly [string]) {}
      function h(x: ReadonlyArray<string>) {}
    `
  }
});
