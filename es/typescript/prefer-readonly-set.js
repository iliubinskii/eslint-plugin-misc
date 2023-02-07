/* eslint-disable xss/no-mixed-html -- Ok */
import * as utils from "../utils";
import { base } from "./base";
export const preferReadonlySet = utils.wrapRule({
    rule: base["no-restricted-syntax"],
    options: [
        {
            message: "Prefer readonly set",
            selector: "TSTypeReference > Identifier[name=Set]"
        }
    ],
    docs: {
        description: "Disallows writable sets.",
        failExamples: "function f(x: Set<string>) {}",
        passExamples: "function f(x: ReadonlySet<string>) {}"
    }
});
//# sourceMappingURL=prefer-readonly-set.js.map