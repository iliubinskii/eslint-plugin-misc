"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectFormat = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_misc_1 = require("typescript-misc");
var MessageId;
(function (MessageId) {
    MessageId["preferMultiline"] = "preferMultiline";
    MessageId["preferSingleLine"] = "preferSingleLine";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.objectFormat = utils.createRule({
    name: "object-format",
    fixable: utils.Fixable.code,
    isOptions: typescript_misc_1.is.object.factory({ maxLineLength: typescript_misc_1.is.number, maxObjectSize: typescript_misc_1.is.number }, {}),
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
                if (texts.length > 0) {
                    const text = context.getText(node);
                    const expectMultiline = texts.length > maxObjectSize ||
                        texts.some(typescript_misc_1.s.multiline) ||
                        node.properties.some(context.hasTrailingComment);
                    const expectSingleLine = !expectMultiline;
                    const gotMultiline = typescript_misc_1.s.multiline(text);
                    const gotSingleLine = typescript_misc_1.s.singleLine(text);
                    if (expectMultiline && gotSingleLine)
                        context.report({
                            fix: () => {
                                return {
                                    range: node.range,
                                    text: `{${eol}${texts.join(commaEol)}${eol}}`
                                };
                            },
                            messageId: MessageId.preferMultiline,
                            node
                        });
                    if (expectSingleLine &&
                        gotMultiline &&
                        predictedLength() <= maxLineLength)
                        context.report({
                            fix: () => {
                                return {
                                    range: node.range,
                                    text: `{${texts.join(comma)}}`
                                };
                            },
                            messageId: MessageId.preferSingleLine,
                            node
                        });
                }
                function predictedLength() {
                    const head = context.getLoc(node.range).start.column;
                    const contents = typescript_misc_1.num.sum(...texts.map(text => text.length));
                    const commas = 2 * (texts.length - 1);
                    const brackets = 4;
                    const tail = typescript_misc_1.s
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