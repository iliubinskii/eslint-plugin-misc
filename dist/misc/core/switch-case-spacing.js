"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchCaseSpacing = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["addEmptyLine"] = "addEmptyLine";
    MessageId["removeEmptyLine"] = "removeEmptyLine";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.switchCaseSpacing = utils.createRule({
    name: "switch-case-spacing",
    fixable: utils.Fixable.whitespace,
    vue: true,
    messages: {
        [MessageId.addEmptyLine]: "Add empty line before switch case",
        [MessageId.removeEmptyLine]: "Remove empty line before switch case"
    },
    docs: {
        description: "Ensures consistent empty lines between switch case statements.",
        failExamples: `
      switch (x) {
        case 1:

        case 2:
          break;
        case 3:
      }
    `,
        passExamples: `
      switch (x) {
        case 1:
        case 2:
          break;

        case 3:
      }
    `
    },
    create: (context) => ({
        SwitchStatement: node => {
            for (const [case1, case2] of functions_1.a.chain(node.cases)) {
                const fallThrough = case1.consequent.length === 0;
                const range = context.getLeadingSpaces(case2);
                const got = context.getText(range);
                const expected = context.eol.repeat(fallThrough ? 1 : 2) +
                    functions_1.s.trimLeadingEmptyLines(got);
                if (got === expected) {
                    // Valid
                }
                else
                    context.report({
                        fix: () => ({ range, text: expected }),
                        messageId: fallThrough
                            ? MessageId.removeEmptyLine
                            : MessageId.addEmptyLine,
                        node: case2
                    });
            }
        }
    })
});
//# sourceMappingURL=switch-case-spacing.js.map