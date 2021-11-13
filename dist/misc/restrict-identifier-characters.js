"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictIdentifierCharacters = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.restrictIdentifierCharacters = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Identifier must consist of english characters and dollar sign",
            selector: "Identifier[name=/[^$\\w]/u]"
        }
    ],
    docs: {
        description: 'Requires "require()" to be assigned to variable.',
        failExamples: `
      function f() { return require("node:path"); }
    `,
        passExamples: `
      const path = require("node:path");

    `
    }
});
//# sourceMappingURL=restrict-identifier-characters.js.map