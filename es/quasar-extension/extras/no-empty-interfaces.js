import * as utils from "../../utils";
import { core } from "../../core";
export const noEmptyInterfaces = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: "Empty interface is not allowed",
            selector: "TSInterfaceDeclaration[body.body.length=0][extends=undefined] > Identifier[name!=Props][name!=Slots]"
        }
    ]
});
//# sourceMappingURL=no-empty-interfaces.js.map