/* eslint-disable @skylib/consistent-filename -- Ok */
/* eslint-disable xss/no-mixed-html -- Ok */

import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlySet = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Prefer readonly set",
      selector: "TSTypeReference > Identifier[name=Set]"
    }
  ],
  docs: {
    description: "Disallows writable sets.",
    failExamples: "function f(x: Set<string>) {}",
    passExamples: "function f(x: ReadonlySet<string>) {}"
  }
});
