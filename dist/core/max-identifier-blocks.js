"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxIdentifierBlocks = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
const typescript_misc_1 = require("typescript-misc");
exports.maxIdentifierBlocks = (0, typescript_misc_1.evaluate)(() => {
    const suffix = "[name=/^[A-Z]*[^A-Z]+([A-Z]+[^A-Z]+){4}/u]";
    return utils.wrapRule({
        rule: base_1.base["no-restricted-syntax"],
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