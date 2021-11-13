"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintrc = void 0;
const no_disable_1 = require("./no-disable");
const no_rules_1 = require("./no-rules");
const no_temp_1 = require("./no-temp");
const functions_1 = require("@skylib/functions");
const sort_synonyms_1 = require("./sort-synonyms");
exports.eslintrc = functions_1.o.prefixKeys({
    "no-disable": no_disable_1.noDisable,
    "no-rules": no_rules_1.noRules,
    "no-temp": no_temp_1.noTemp,
    "sort-synonyms": sort_synonyms_1.sortSynonyms
}, "eslintrc/");
//# sourceMappingURL=index.js.map