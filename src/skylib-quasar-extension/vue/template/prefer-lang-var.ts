import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferLangVar = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Use lang variable",
      selector:
        "VAttribute > VIdentifier.key[name=/^(?:alt|aria-label|aria-placeholder|aria-roledescription|aria-valuetext|caption|confirmation|label|placeholder|title|tooltip|validation-label)$/u]"
    }
  ]
});
