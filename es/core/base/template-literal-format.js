import * as utils from "../../utils";
import { a, fn, s } from "real-fns";
export var MessageId;
(function (MessageId) {
    MessageId["invalidFormat"] = "invalidFormat";
})(MessageId || (MessageId = {}));
export const templateLiteralFormat = utils.createRule({
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
    create: (context) => ({
        TemplateLiteral: node => {
            const lines = s.lines(context.getText(node));
            if (lines.length > 1) {
                const firstLine = a.first(lines);
                const middleLines = lines.slice(1, -1);
                const nonEmptyMiddleLines = middleLines.filter(line => line.length);
                const lastLine = a.last(lines);
                if (firstLine === "`" &&
                    nonEmptyMiddleLines.length &&
                    lastLine.trimStart() === "`") {
                    const firstPadding = fn.pipe(context.getText([0, node.range[0]]), s.lines, a.last, s.leadingSpaces).length;
                    const middlePadding = Math.min(...nonEmptyMiddleLines.map(line => s.leadingSpaces(line).length));
                    const middleDelta = firstPadding - middlePadding + 2;
                    const lastPadding = s.leadingSpaces(lastLine).length;
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
        ? " ".repeat(s.leadingSpaces(line).length + delta) + line.trimStart()
        : line;
}
//# sourceMappingURL=template-literal-format.js.map