"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectChore = void 0;
const eslintrc_1 = require("./eslintrc");
const real_fns_1 = require("real-fns");
const sort_commitlint_1 = require("./sort-commitlint");
exports.projectChore = real_fns_1.o.prefixKeys(Object.assign({ "sort-commitlint": sort_commitlint_1.sortCommitlint }, eslintrc_1.eslintrc), "project-chore/");
//# sourceMappingURL=index.js.map