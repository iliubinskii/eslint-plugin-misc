"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateLiteralFormat = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["invalidFormat"] = "invalidFormat";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.templateLiteralFormat = utils.createRule({
    name: "template-literal-format",
    fixable: utils.Fixable.code,
    vue: true,
    messages: { [MessageId.invalidFormat]: "Invalid template literal format" },
    docs: {
        description: "Requires consistent padding in template literals.",
        failExamples: `
      const x = \`
          text
          \`;
    `,
        passExamples: `
      const x = \`
        text
      \`;
    `
    },
    create: (context) => ({
        TemplateLiteral: node => {
            const lines = functions_1.s.lines(context.getText(node));
            if (lines.length > 1) {
                const firstLine = functions_1.a.first(lines);
                const middleLines = lines.slice(1, -1);
                const nonEmptyMiddleLines = middleLines.filter(line => line.length);
                const lastLine = functions_1.a.last(lines);
                if (firstLine === "`" &&
                    nonEmptyMiddleLines.length &&
                    lastLine.trimStart() === "`") {
                    const firstPadding = functions_1.fn.pipe(context.getText([0, node.range[0]]), functions_1.s.lines, functions_1.a.last, functions_1.s.leadingSpaces).length;
                    const middlePadding = Math.min(...nonEmptyMiddleLines.map(line => functions_1.s.leadingSpaces(line).length));
                    const middleDelta = firstPadding - middlePadding + 2;
                    const lastPadding = functions_1.s.leadingSpaces(lastLine).length;
                    const lastDelta = firstPadding - lastPadding;
                    if (middleDelta || lastDelta)
                        context.report({
                            fix: () => ({
                                range: node.range,
                                text: [
                                    firstLine,
                                    ...middleLines.map(line => pad(line, middleDelta)),
                                    pad(lastLine, lastDelta)
                                ].join(context.eol)
                            }),
                            messageId: MessageId.invalidFormat,
                            node
                        });
                }
                else
                    context.report({ messageId: MessageId.invalidFormat, node });
            }
        }
    })
});
/**
 * Pads line.
 *
 * @param line - Line.
 * @param delta - The number of spaces to add/remove.
 * @returns Padded line.
 */
function pad(line, delta) {
    return line.length
        ? " ".repeat(functions_1.s.leadingSpaces(line).length + delta) + line.trimStart()
        : line;
}
//# sourceMappingURL=template-literal-format.js.map