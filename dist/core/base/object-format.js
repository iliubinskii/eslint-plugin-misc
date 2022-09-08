"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectFormat = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const real_fns_1 = require("real-fns");
var MessageId;
(function (MessageId) {
    MessageId["preferMultiline"] = "preferMultiline";
    MessageId["preferSingleLine"] = "preferSingleLine";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.objectFormat = utils.createRule({
    name: "object-format",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: real_fns_1.is.object.factory({ maxLineLength: real_fns_1.is.number, maxObjectSize: real_fns_1.is.number }, {}),
    defaultOptions: { maxLineLength: 75, maxObjectSize: 3 },
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
                        texts.some(real_fns_1.s.multiline) ||
                        node.properties.some(context.hasTrailingComment);
                    const expectSingleLine = !expectMultiline;
                    const gotMultiline = real_fns_1.s.multiline(text);
                    const gotSingleLine = real_fns_1.s.singleLine(text);
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
                    const contents = real_fns_1.num.sum(...texts.map(text => text.length));
                    const commas = 2 * (texts.length - 1);
                    const brackets = 4;
                    const tail = real_fns_1.s
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