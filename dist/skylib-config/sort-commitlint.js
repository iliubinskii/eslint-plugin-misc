"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortCommitlint = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.sortCommitlint = utils.wrapRule({
    rule: misc_1.misc["sort-array"],
    options: [{ triggerByComment: false }]
});
//# sourceMappingURL=sort-commitlint.js.map