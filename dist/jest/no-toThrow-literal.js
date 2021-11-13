"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noToThrowLiteral = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const typescript_1 = require("../typescript");
exports.noToThrowLiteral = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "String argument is not allowed",
            selector: "CallExpression[callee.property.name=toThrow] > .arguments",
            typeIs: utils.TypeGroup.string
        }
    ],
    docs: {
        description: 'Disallows string argument in "toThrow" matcher.',
        failExamples: `
      expect(f).toThrow("Error message");
    `,
        passExamples: `
      expect(f).toThrow(new Error("Error message"));
    `
    }
});
//# sourceMappingURL=no-toThrow-literal.js.map