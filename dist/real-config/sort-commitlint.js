"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortCommitlint = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("../core");
exports.sortCommitlint = utils.wrapRule({
    rule: core_1.core["sort-array"],
    options: [{ triggerByComment: false }]
});
//# sourceMappingURL=sort-commitlint.js.map