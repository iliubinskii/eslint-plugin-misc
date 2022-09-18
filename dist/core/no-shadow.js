"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noShadow = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noShadow = utils.wrapRule({
    rule: base_1.base.wrap,
    options: [
        {
            plugin: "@typescript-eslint/eslint-plugin",
            rule: "no-shadow",
            skip: "TSEnumDeclaration *"
        }
    ],
    docs: {
        description: 'This rule wraps "@typescript-eslint/no-shadow" rule, but skips checking enum.',
        failExamples: `
      const x = 1;
      function f() { const x = 1; }
    `,
        passExamples: `
      const x = 1;
      enum E { x = "x" }
    `
    }
});
//# sourceMappingURL=no-shadow.js.map