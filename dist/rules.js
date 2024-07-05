"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const core_1 = require("./core");
const utils_1 = require("./utils");
const typescript_1 = require("./typescript");
exports.rules = {
    ...core_1.core,
    ...typescript_1.typescript,
    ...(0, utils_1.getSynonyms)("./.eslintrc.synonyms.cjs", { ...core_1.core, ...typescript_1.typescript })
};
//# sourceMappingURL=rules.js.map