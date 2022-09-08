/* eslint-disable xss/no-mixed-html -- Ok */

import * as utils from "../utils";
import { base } from "./base";

export const preferReadonlyMap = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "Prefer readonly map",
      selector: "TSTypeReference > Identifier[name=Map]"
    }
  ],
  docs: {
    description: "Disallows writable maps.",
    failExamples: "function f(x: Map<string, string>) {}",
    passExamples: "function f(x: ReadonlyMap<string, string>) {}"
  }
});
