"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noLanguageMixing = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
const typescript_misc_1 = require("typescript-misc");
exports.noLanguageMixing = (0, typescript_misc_1.evaluate)(() => {
    const br = String.raw `[\d_]*`;
    const eng = String.raw `\w`;
    const international = String.raw `[^\u0000-\u00FF]`;
    const re = `/${eng}${br}${international}|${international}${br}${eng}/u`;
    return utils.wrapRule({
        rule: base_1.base["no-restricted-syntax"],
        options: [
            {
                message: "No language mixing",
                selector: [`Literal[value=${re}]`, `TemplateLiteral[value.raw=${re}]`]
            }
        ],
        docs: {
            description: "Disallows language mixing.",
            // eslint-disable-next-line misc/no-language-mixing -- Ok
            failExamples: 'const x = "xyz123абв";',
            passExamples: `
        const x = "xyz";
        const y = "123";
        const z = "абв";
      `
        }
    });
});
//# sourceMappingURL=no-language-mixing.js.map