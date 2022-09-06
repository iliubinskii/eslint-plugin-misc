import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferLangVar = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Use lang variable",
      selector:
        "VAttribute > VIdentifier.key[name=/^(?:alt|aria-label|aria-placeholder|aria-roledescription|aria-valuetext|caption|confirmation|label|placeholder|title|tooltip|validation-label)$/u]"
    }
  ]
});
