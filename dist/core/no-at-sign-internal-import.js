"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noAtSignInternalImport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
exports.noAtSignInternalImport = utils.wrapRule({
    rule: base_1.base["disallow-import"],
    options: [{ disallow: ["@/**"] }],
    docs: {
        description: 'Disallows "@/**" import.',
        failExamples: 'import x from "@/folder";',
        passExamples: 'import x from "@";'
    }
});
//# sourceMappingURL=no-at-sign-internal-import.js.map