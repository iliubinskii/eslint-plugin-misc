import * as utils from "../../../utils";
import { core } from "../../../core";
export const noGlobalLang = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: "No global lang",
            selector: "ImportDeclaration[importKind=value][source.value=real-facades] > ImportSpecifier[imported.name=lang]"
        }
    ]
});
//# sourceMappingURL=no-global-lang.js.map