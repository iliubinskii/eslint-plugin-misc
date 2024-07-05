"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentSourceExtension = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.consistentSourceExtension = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Remove extension",
            selector: String.raw `Literal.source[value=/\.(?:js|json|ts)$/u]`
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