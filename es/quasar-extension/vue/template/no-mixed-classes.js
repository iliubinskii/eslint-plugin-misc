import * as utils from "../../../utils";
import { core } from "../../../core";
export const noMixedClasses = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: "Do not mix module and static classes",
            selector: "VExpressionContainer > TemplateLiteral > MemberExpression > Identifier[name=$style]"
        }
    ]
});
//# sourceMappingURL=no-mixed-classes.js.map