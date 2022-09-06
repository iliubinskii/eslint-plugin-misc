import * as utils from "../../utils";
import { core } from "../../core";

export const noRules = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Rules section is disallowed",
      selector: "Property > Identifier.key[name=rules]"
    }
  ]
});
