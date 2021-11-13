import * as utils from "../../utils";
import { misc } from "../../misc";

export const noRules = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Rules section is disallowed",
      selector: "Property > Identifier.key[name=rules]"
    }
  ]
});
