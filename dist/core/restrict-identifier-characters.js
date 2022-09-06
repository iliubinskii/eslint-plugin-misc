"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictIdentifierCharacters = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.restrictIdentifierCharacters = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Identifier must consist of english characters and dollar sign",
            selector: "Identifier[name=/[^$\\w]/u]"
        }
    ],
    docs: {
        description: 'Requires "require()" to be assigned to variable.',
        failExamples: 'function f() { return require("node:path"); }',
        passExamples: 'const path = require("node:path");'
    }
});
//# sourceMappingURL=restrict-identifier-characters.js.map