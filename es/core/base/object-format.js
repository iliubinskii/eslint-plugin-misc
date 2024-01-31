import * as utils from "../../utils";
import { is, num, s } from "typescript-misc";
export var MessageId;
(function (MessageId) {
    MessageId["preferMultiline"] = "preferMultiline";
    MessageId["preferSingleLine"] = "preferSingleLine";
})(MessageId || (MessageId = {}));
export const objectFormat = utils.createRule({
    name: "object-format",
    fixable: utils.Fixable.code,
    isOptions: is.object.factory({ maxLineLength: is.number, maxObjectSize: is.number }, {}),
    defaultOptions: { maxLineLength: 80, maxObjectSize: 3 },
    messages: {
        [MessageId.preferMultiline]: "Prefer multiline object literal",
        [MessageId.preferSingleLine]: "Prefer single-line object literal"
    },
    docs: {
        description: "Requires multiline or single-line object format.",
        optionTypes: { maxLineLength: "number", maxObjectSize: "number" },
        optionDescriptions: {
            maxLineLength: "Max line length for single-line object",
            maxObjectSize: "Max object size for single-line object"
        },
        failExamples: `
      const obj1 = {
        a: 1,
        b: 2,
        c: 3
      };
      const obj2 = { a: 1, b: 2, c: 3, d: 4 };
    `,
        passExamples: `
      const obj1 = { a: 1, b: 2, c: 3 };
      const obj2 = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      };
    `
    },
    create: (context) => {
        const eol = context.eol;
        const comma = ",";
        const commaEol = `,${eol}`;
        const { maxLineLength, maxObjectSize } = context.options;
        return {
            ObjectExpression: node => {
                const texts = node.properties.map(property => context.getFullText(property).trim());
                if (texts.length) {
                    const text = context.getText(node);
                    const expectMultiline = texts.length > maxObjectSize ||
                        texts.some(s.multiline) ||
                        node.properties.some(context.hasTrailingComment);
                    const expectSingleLine = !expectMultiline;
                    const gotMultiline = s.multiline(text);
                    const gotSingleLine = s.singleLine(text);
                    if (expectMultiline && gotSingleLine)
                        context.report({
                            fix: () => ({
                                range: node.range,
                                text: `{${eol}${texts.join(commaEol)}${eol}}`
                            }),
                            messageId: MessageId.preferMultiline,
                            node
                        });
                    if (expectSingleLine &&
                        gotMultiline &&
                        predictedLength() <= maxLineLength)
                        context.report({
                            fix: () => ({
                                range: node.range,
                                text: `{${texts.join(comma)}}`
                            }),
                            messageId: MessageId.preferSingleLine,
                            node
                        });
                }
                function predictedLength() {
                    const head = context.getLoc(node.range).start.column;
                    const contents = num.sum(...texts.map(text => text.length));
                    const commas = 2 * (texts.length - 1);
                    const brackets = 4;
                    const tail = s
                        .firstLine(context.getText(node.range[1]))
                        // eslint-disable-next-line regexp/optimal-quantifier-concatenation -- Wait for https://github.com/ota-meshi/eslint-plugin-regexp/issues/451
                        .replace(/^((?: as const)?\S*).*/u, "$1").length;
                    return head + contents + commas + brackets + tail;
                }
            }
        };
    }
});
//# sourceMappingURL=object-format.js.map