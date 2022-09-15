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
            selector: "PropertyDefinition:not([typeAnnotation]) > ArrowFunctionExpression"
        }
    ],
    docs: {
        description: "Requires use of class methods instead of function properties.",
        failExamples: `
      class SampleClass {
        static f = () => {};
        g = () => {};
      }
    `,
        passExamples: `
      class SampleClass1 {
        static f: F = () => {};
        g: G = () => {};
      }

      class SampleClass2 {
        static f() {}
        g() {}
      }
    `
    }
});
//# sourceMappingURL=prefer-class-method.js.map