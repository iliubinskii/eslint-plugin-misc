"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePropTypeAnnotation = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.requirePropTypeAnnotation = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Expecting type annotation",
            selector: "PropertyDefinition[typeAnnotation=undefined][value=null]"
        }
    ],
    docs: {
        description: "Requires type annotation for class properties.",
        failExamples: `
      class C {
        x;
      }
    `,
        passExamples: `
      class C {
        x: string;
        y = "";
      }
    `
    }
});
//# sourceMappingURL=require-prop-type-annotation.js.map