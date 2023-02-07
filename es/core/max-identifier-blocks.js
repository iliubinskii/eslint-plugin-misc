import * as utils from "../utils";
import { base } from "./base";
import { evaluate } from "real-fns";
export const maxIdentifierBlocks = evaluate(() => {
    const suffix = "[name=/^[A-Z]*[^A-Z]+([A-Z]+[^A-Z]+){4}/u]";
    return utils.wrapRule({
        rule: base["no-restricted-syntax"],
        options: [
            {
                ignoreSelector: "Property[shorthand=true] > Identifier.key",
                message: "Identifier should not contain more than 4 blocks",
                selector: [`.id${suffix}`, `.key${suffix}`]
            }
        ],
        docs: {
            description: "Restricts identifier complexity.",
            failExamples: "function firstSecondThirdFourthPart() {}",
            passExamples: "function firstSecondThirdPart() {}"
        }
    });
});
//# sourceMappingURL=max-identifier-blocks.js.map