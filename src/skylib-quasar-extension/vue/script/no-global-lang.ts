import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noGlobalLang = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "No global lang",
      selector:
        "ImportDeclaration[importKind=value][source.value=@skylib/facades] > ImportSpecifier[imported.name=lang]"
    }
  ]
});
