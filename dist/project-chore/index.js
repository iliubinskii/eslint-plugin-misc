"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectChore = void 0;
const eslintrc_1 = require("./eslintrc");
const typescript_misc_1 = require("typescript-misc");
const sort_commitlint_1 = require("./sort-commitlint");
exports.projectChore = typescript_misc_1.o.prefixKeys({ "sort-commitlint": sort_commitlint_1.sortCommitlint, ...eslintrc_1.eslintrc }, "project-chore/");
//# sourceMappingURL=index.js.map