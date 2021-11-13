"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryBreak = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noUnnecessaryBreak = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Unnecessary "break" statement',
            selector: "SwitchCase:last-child > BreakStatement.consequent"
        }
    ],
    docs: {
        description: 'Disallows unnecessary "break".',
        failExamples: `
      switch (x) {
        case 1:
          break;

        case 2:
          break;
      }
    `,
        passExamples: `
      switch (x) {
        case 1:
          break;

        case 2:
      }
    `
    }
});
//# sourceMappingURL=no-unnecessary-break.js.map