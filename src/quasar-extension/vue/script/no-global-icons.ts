import * as utils from "../../../utils";
import { core } from "../../../core";

export const noGlobalIcons = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "No global icons",
      selector:
        "ImportDeclaration[importKind=value][source.value=@skylib/facades] > ImportSpecifier[imported.name=icons]"
    }
  ]
});
