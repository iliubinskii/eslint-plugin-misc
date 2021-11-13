import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noGlobalIcons = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "No global icons",
      selector:
        "ImportDeclaration[importKind=value][source.value=@skylib/facades] > ImportSpecifier[imported.name=icons]"
    }
  ]
});
