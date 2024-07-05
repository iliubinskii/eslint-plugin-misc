import * as utils from "../utils";
import { base } from "./base";

export const consistentSymbolDescription = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "Prefer kebab-case symbol description",
      selector: String.raw`CallExpression[callee.name=Symbol] > Literal:not([value=/^(?:[\d\-a-z]|__)+$/u])`
    }
  ],
  docs: {
    description: "Requires consistent symbol description.",
    failExamples: 'const x = Symbol("SampleDescription");',
    passExamples: 'const x = Symbol("kebab-case__kebab-case");'
  }
});
