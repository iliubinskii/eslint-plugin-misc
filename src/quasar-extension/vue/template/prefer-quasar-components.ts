import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferQuasarComponents = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    { message: "Prefer quasar component", selector: "VElement[name=/^e-/u]" }
  ]
});
