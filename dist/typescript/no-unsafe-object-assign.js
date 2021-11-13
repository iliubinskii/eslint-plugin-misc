"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnsafeObjectAssign = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noUnsafeObjectAssign = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Do not assign to readonly object",
            selector: "CallExpression[callee.object.name=Object][callee.property.name=assign] > Identifier.arguments:first-child",
            typeIs: utils.TypeGroup.readonly
        }
    ],
    docs: {
        description: 'Disallows unsafe "Object.assign".',
        failExamples: `
      const x = { value: 1 } as const;

      Object.assign(x, { value: 2 });
    `,
        passExamples: `
      const x = { value: 1 };

      Object.assign(x, { value: 2 });
    `
    }
});
//# sourceMappingURL=no-unsafe-object-assign.js.map