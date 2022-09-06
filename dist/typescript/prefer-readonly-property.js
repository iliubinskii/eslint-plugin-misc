"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyProperty = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.preferReadonlyProperty = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
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