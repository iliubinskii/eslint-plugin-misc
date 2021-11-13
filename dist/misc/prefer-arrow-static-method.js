"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferArrowStaticMethod = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferArrowStaticMethod = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Prefer arrow function",
            selector: "MethodDefinition[static=true]"
        }
    ],
    docs: {
        description: "Requires use of arrow static methods.",
        failExamples: `
      class C { static f() {} }
    `,
        passExamples: `
      class C { static f = () => {}; }
    `
    }
});
//# sourceMappingURL=prefer-arrow-static-method.js.map