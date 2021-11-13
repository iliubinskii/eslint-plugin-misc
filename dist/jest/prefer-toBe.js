"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferToBe = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const typescript_1 = require("../typescript");
exports.preferToBe = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: 'Use "toBe" matcher instead',
            selector: "CallExpression[callee.property.name=toStrictEqual] > .arguments",
            typeIsOneOf: [
                utils.TypeGroup.boolean,
                utils.TypeGroup.number,
                utils.TypeGroup.string
            ]
        }
    ],
    docs: {
        description: 'Requires "toBe" matcher instead of "toStrictEqual" for primitive argument types.',
        failExamples: `
      const x = 1;
      expect(y).toStrictEqual(x);

    `,
        passExamples: `
      const x = {};
      expect(y).toStrictEqual(x);
    `
    }
});
//# sourceMappingURL=prefer-toBe.js.map