import * as utils from "../../utils";
import { misc } from "../../misc";

export const noEmptyInterfaces = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Empty interface is not allowed",
      selector:
        "TSInterfaceDeclaration[body.body.length=0][extends=undefined] > Identifier[name!=Props][name!=Slots]"
    }
  ]
});
