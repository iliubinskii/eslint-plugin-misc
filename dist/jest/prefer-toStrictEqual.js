"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferToStrictEqual = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const typescript_1 = require("../typescript");
exports.preferToStrictEqual = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: 'Use "toStrictEqual" matcher instead',
            selector: "CallExpression[callee.property.name=toBe] > .arguments",
            typeIsNoneOf: [
                utils.TypeGroup.boolean,
                utils.TypeGroup.number,
                utils.TypeGroup.string
            ]
        }
    ],
    docs: {
        description: 'Requires "toStrictEqual" matcher instead of "toBe" for non-primitive argument types.',
        failExamples: `
      const x = {};
      expect(y).toStrictEqual(x);
    `,
        passExamples: `
      const x = 1;
      expect(y).toStrictEqual(x);
    `
    }
});
//# sourceMappingURL=prefer-toStrictEqual.js.map