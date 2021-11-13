"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentSourceExtension = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.consistentSourceExtension = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Remove extension",
            selector: "Literal.source[value=/\\.(?:js|json|ts)$/u]"
        }
    ],
    docs: {
        description: "Requires consistent import/export source extension.",
        failExamples: `
      import x1 from "source1.js";
      import x2 from "source2.json";
      import x3 from "source3.ts";
    `,
        passExamples: `
      import x1 from "source1";
      import x2 from "source2";
      import x3 from "source3";
    `
    }
});
//# sourceMappingURL=consistent-source-extension.js.map