"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryInitialization = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noUnnecessaryInitialization = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary initialization",
            selector: [
                "PropertyDefinition > Identifier.value[name=undefined]",
                "VariableDeclarator > Identifier.init[name=undefined]"
            ]
        }
    ],
    docs: {
        description: "Disallows unnecessary initialization.",
        failExamples: `
      const x = undefined;

      class C {
        x = undefined;
      }
    `,
        passExamples: `
      const x = 1;

      class C {
        x = 1;
      }
    `
    }
});
//# sourceMappingURL=no-unnecessary-initialization.js.map