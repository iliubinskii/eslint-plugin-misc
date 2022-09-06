"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noAtSignImport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noAtSignImport = utils.wrapRule({
    rule: base_1.base["disallow-import"],
    options: [{ disallow: ["@"] }],
    docs: {
        description: 'Disallows "@" import.',
        failExamples: 'import x from "@";',
        passExamples: 'import x from "@/folder";'
    }
});
//# sourceMappingURL=no-at-sign-import.js.map