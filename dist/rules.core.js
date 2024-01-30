"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const core_1 = require("./core");
const eslintrc_1 = require("./eslintrc");
const jest_1 = require("./jest");
const project_chore_1 = require("./project-chore");
const ts_misc_1 = require("./ts-misc");
const typescript_1 = require("./typescript");
exports.rules = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, core_1.core), eslintrc_1.eslintrc), jest_1.jest), project_chore_1.projectChore), ts_misc_1.tsMisc), typescript_1.typescript);
//# sourceMappingURL=rules.core.js.map