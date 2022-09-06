import * as utils from "../utils";
import { base } from "./base";

export const noNever = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: 'Avoid "never" type',
      selector: "Identifier",
      typeIs: utils.TypeGroup.never
    }
  ],
  docs: {
    description: 'Disallow "never" type.',
    failExamples: 'function f(value: "a" & "b") {}',
    passExamples: 'function f(value: "a" | "b") {}'
  }
});
