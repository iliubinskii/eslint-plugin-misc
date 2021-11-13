"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noThisVoid = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noThisVoid = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use arrow function instead of "this: void"',
            selector: "Identifier[name=this][typeAnnotation.typeAnnotation.type=TSVoidKeyword]"
        }
    ],
    docs: {
        description: 'Disallows "this: void" syntax.',
        failExamples: `
      class C {
        f(this: void) {}
      }
    `,
        passExamples: `
      class C {
        f: () => {}
      }
    `
    }
});
//# sourceMappingURL=no-this-void.js.map