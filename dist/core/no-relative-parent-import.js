"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRelativeParentImport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noRelativeParentImport = utils.wrapRule({
    rule: base_1.base["disallow-import"],
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
        failExamples: 'import x from "../source";',
        passExamples: 'import x from "./source";'
    }
});
//# sourceMappingURL=no-relative-parent-import.js.map