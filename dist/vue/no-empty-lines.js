"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noEmptyLines = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.noEmptyLines = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "Unexpected empty line",
            selector: "VElement[name=template] VText[value=/^\\s*\\n\\s*\\n\\s*$/u]"
        }
    ],
    docs: {
        // eslint-disable-next-line xss/no-mixed-html -- Ok
        description: "Disallow empty lines inside <template> section.",
        failExamples: `
      <template>
        <p></p>

        <p></p>
      </template>
    `,
        passExamples: `
      <template>
        <p></p>
        text

        text
        <p></p>
      </template>
    `
    }
});
//# sourceMappingURL=no-empty-lines.js.map