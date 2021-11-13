"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noExpressionEmptyLines = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["unexpectedEmptyLine"] = "unexpectedEmptyLine";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noExpressionEmptyLines = utils.createRule({
    name: "no-expression-empty-lines",
    fixable: utils.Fixable.whitespace,
    vue: true,
    messages: { [MessageId.unexpectedEmptyLine]: "Unexpected empty line before" },
    docs: {
        description: "Disallows empty lines inside expressions.",
        failExamples: `
      const result = []

        .map(x => x)

        .map(x => x);
    `,
        passExamples: `
      const result = []
        .map(x => x)
        .map(x => x);
    `
    },
    create: (context) => ({
        MemberExpression: node => {
            const pos = node.object.range[1];
            const got = functions_1.s.leadingSpaces(context.getText(pos));
            if (got.includes("\n")) {
                const expected = context.eol + functions_1.s.trimLeadingEmptyLines(got);
                if (got === expected) {
                    // Valid
                }
                else
                    context.report({
                        fix: () => ({
                            range: [pos, pos + got.length],
                            text: expected
                        }),
                        messageId: MessageId.unexpectedEmptyLine,
                        node: node.property
                    });
            }
        }
    })
});
//# sourceMappingURL=no-expression-empty-lines.js.map