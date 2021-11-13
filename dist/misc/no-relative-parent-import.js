"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRelativeParentImport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noRelativeParentImport = utils.wrapRule({
    rule: core_1.core["disallow-import"],
    options: [
        {
            disallow: [
                "../**",
                "../../**",
                "../../../**",
                "../../../../**",
                "../../../../../**"
            ]
        }
    ],
    docs: {
        description: "Disallows relative parent import.",
        failExamples: `
      import x from "../source";
    `,
        passExamples: `
      import x from "./source";
    `
    }
});
//# sourceMappingURL=no-relative-parent-import.js.map