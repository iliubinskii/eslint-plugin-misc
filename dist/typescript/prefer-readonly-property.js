"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyProperty = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferReadonlyProperty = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Prefer readonly property",
            selector: ":matches(PropertyDefinition, TSPropertySignature)[readonly!=true]"
        }
    ],
    docs: {
        description: "Disallows writable properties.",
        failExamples: `
      class C {
        x: string;
      }
    `,
        passExamples: `
      class C {
        readonly x: string;
      }
    `
    }
});
//# sourceMappingURL=prefer-readonly-property.js.map