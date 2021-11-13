"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const rules_core_1 = require("./rules.core");
exports.rules = Object.assign(Object.assign({}, rules_core_1.rules), utils.getSynonyms("./.eslintrc.synonyms.js", rules_core_1.rules));
//# sourceMappingURL=rules.js.map