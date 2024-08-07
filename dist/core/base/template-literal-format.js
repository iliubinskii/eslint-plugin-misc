"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateLiteralFormat = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_misc_1 = require("typescript-misc");
var MessageId;
(function (MessageId) {
    MessageId["invalidFormat"] = "invalidFormat";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.templateLiteralFormat = utils.createRule({
    name: "template-literal-format",
    fixable: utils.Fixable.code,
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
    create: (context) => {
        return {
            TemplateLiteral: node => {
                const lines = typescript_misc_1.s.lines(context.getText(node));
                if (lines.length > 1) {
                    const firstLine = typescript_misc_1.a.first(lines);
                    const middleLines = lines.slice(1, -1);
                    const nonEmptyMiddleLines = middleLines.filter(line => line.length);
                    const lastLine = typescript_misc_1.a.last(lines);
                    if (firstLine === "`" &&
                        nonEmptyMiddleLines.length > 0 &&
                        lastLine.trimStart() === "`") {
                        const firstPadding = typescript_misc_1.fn.pipe(context.getText([0, node.range[0]]), typescript_misc_1.s.lines, typescript_misc_1.a.last, typescript_misc_1.s.leadingSpaces).length;
                        const middlePadding = Math.min(...nonEmptyMiddleLines.map(line => typescript_misc_1.s.leadingSpaces(line).length));
                        const middleDelta = firstPadding - middlePadding + 2;
                        const lastPadding = typescript_misc_1.s.leadingSpaces(lastLine).length;
                        const lastDelta = firstPadding - lastPadding;
                        if (middleDelta || lastDelta)
                            context.report({
                                fix: () => {
                                    return {
                                        range: node.range,
                                        text: [
                                            firstLine,
                                            ...middleLines.map(line => pad(line, middleDelta)),
                                            pad(lastLine, lastDelta)
                                        ].join(context.eol)
                                    };
                                },
                                messageId: MessageId.invalidFormat,
                                node
                            });
                    }
                    else
                        context.report({ messageId: MessageId.invalidFormat, node });
                }
            }
        };
    }
});
/**
 * Pads line.
 * @param line - Line.
 * @param delta - The number of spaces to add/remove.
 * @returns Padded line.
 */
function pad(line, delta) {
    return line.length > 0
        ? " ".repeat(typescript_misc_1.s.leadingSpaces(line).length + delta) + line.trimStart()
        : line;
}
//# sourceMappingURL=template-literal-format.js.map