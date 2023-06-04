"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementContentsSpacing = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const real_fns_1 = require("real-fns");
var MessageId;
(function (MessageId) {
    MessageId["addSpaces"] = "addSpaces";
    MessageId["removeSpaces"] = "removeSpaces";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.elementContentsSpacing = utils.createRule({
    name: "element-contents-spacing",
    fixable: utils.Fixable.code,
    vue: true,
    messages: {
        [MessageId.addSpaces]: "Add spaces around double curly",
        [MessageId.removeSpaces]: "Remove spaces around double curly"
    },
    docs: {
        description: "Controls spaces around HTML element contents.",
        failExamples: `
      <template>
        <p> single-line contents </p>
      </template>
    `,
        passExamples: `
      <template>
        <p>single-line contents</p>
        <p>
          multiline contents
          multiline contents
        </p>
      </template>
    `
    },
    create: (context) => ({
        VElement: (node) => {
            if (node.children.length) {
                const nodeText = context.getText(node.range);
                const range = (0, real_fns_1.evaluate)(() => {
                    const { children } = node;
                    const first = real_fns_1.a.first(children);
                    const last = real_fns_1.a.last(children);
                    return [first.range[0], last.range[1]];
                });
                const text = context.getText(range);
                const leadingSpaces = real_fns_1.s.leadingSpaces(text);
                const trailingSpaces = real_fns_1.s.trailingSpaces(text);
                if (real_fns_1.s.multiline(nodeText) && (!leadingSpaces || !trailingSpaces))
                    context.report({
                        fix: () => ({ range, text: ` ${text.trim()} ` }),
                        loc: context.getLoc(range),
                        messageId: MessageId.addSpaces
                    });
                if (real_fns_1.s.singleLine(nodeText) && (leadingSpaces || trailingSpaces))
                    context.report({
                        fix: () => ({ range, text: text.trim() }),
                        loc: context.getLoc(range),
                        messageId: MessageId.removeSpaces
                    });
            }
        }
    })
});
//# sourceMappingURL=element-contents-spacing.js.map