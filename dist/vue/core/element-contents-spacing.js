"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementContentsSpacing = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["addSpaces"] = "addSpaces";
    MessageId["removeSpaces"] = "removeSpaces";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
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
                const range = (0, functions_1.evaluate)(() => {
                    const { children } = node;
                    const first = functions_1.a.first(children);
                    const last = functions_1.a.last(children);
                    return [first.range[0], last.range[1]];
                });
                const got = context.getText(range);
                const leadingSpaces = functions_1.s.leadingSpaces(got);
                const trailingSpaces = functions_1.s.trailingSpaces(got);
                if (functions_1.s.multiline(got) && (!leadingSpaces || !trailingSpaces))
                    context.report({
                        fix: () => ({ range, text: ` ${got.trim()} ` }),
                        loc: context.getLoc(range),
                        messageId: MessageId.addSpaces
                    });
                if (functions_1.s.singleLine(got) && (leadingSpaces || trailingSpaces))
                    context.report({
                        fix: () => ({ range, text: got.trim() }),
                        loc: context.getLoc(range),
                        messageId: MessageId.removeSpaces
                    });
            }
        }
    })
});
//# sourceMappingURL=element-contents-spacing.js.map