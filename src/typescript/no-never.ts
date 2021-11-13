import * as utils from "../utils";
import { core } from "./core";

export const noNever = utils.wrapRule({
  rule: core["no-restricted-syntax"],
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
