import * as utils from "../../utils";
import { a, evaluate, s } from "real-fns";
export var MessageId;
(function (MessageId) {
    MessageId["addSpaces"] = "addSpaces";
    MessageId["removeSpaces"] = "removeSpaces";
})(MessageId || (MessageId = {}));
export const elementContentsSpacing = utils.createRule({
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
                const range = evaluate(() => {
                    const { children } = node;
                    const first = a.first(children);
                    const last = a.last(children);
                    return [first.range[0], last.range[1]];
                });
                const text = context.getText(range);
                const leadingSpaces = s.leadingSpaces(text);
                const trailingSpaces = s.trailingSpaces(text);
                if (s.multiline(nodeText) && (!leadingSpaces || !trailingSpaces))
                    context.report({
                        fix: () => ({ range, text: ` ${text.trim()} ` }),
                        loc: context.getLoc(range),
                        messageId: MessageId.addSpaces
                    });
                if (s.singleLine(nodeText) && (leadingSpaces || trailingSpaces))
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