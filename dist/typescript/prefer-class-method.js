"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClassMethod = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.preferClassMethod = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "use of class method instead of function property",
            selector: "PropertyDefinition > ArrowFunctionExpression"
        }
    ],
    docs: {
        description: "Requires use of class methods instead of function properties.",
        failExamples: `
      class C {
        static f: () => {};
        g: () => {};
      }
    `,
        passExamples: `
      class C {
        static f() {}
        g() {}
      }
    `
    }
});
//# sourceMappingURL=prefer-class-method.js.map