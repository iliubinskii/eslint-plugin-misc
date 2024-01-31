import * as utils from "../../utils";
import { a } from "typescript-misc";
export var MessageId;
(function (MessageId) {
    MessageId["incorrectSorting"] = "incorrectSorting";
})(MessageId || (MessageId = {}));
export const sortTopComments = utils.createRule({
    name: "sort-top-comments",
    fixable: utils.Fixable.code,
    messages: {
        ...utils.sort.messages,
        [MessageId.incorrectSorting]: "Incorrect sorting"
    },
    docs: {
        description: "Sorts top comments.",
        failExamples: `
      // Comment 4
      // Comment 3
      /* Comment 2 */
      /* Comment 1 */
    `,
        passExamples: `
      /* Comment 1 */
      /* Comment 2 */
      // Comment 3
      // Comment 4
    `
    },
    create: (context) => ({
        "Program:exit": (node) => {
            const texts = context.getComments(node);
            const got = texts.join("\n");
            const expected = a.sort(texts, utils.compare).join("\n");
            if (got === expected) {
                // Valid
            }
            else {
                const ranges = context.getCommentRanges(node);
                const range = [a.first(ranges)[0], a.last(ranges)[1]];
                context.report({
                    fix: () => ({ range, text: expected }),
                    loc: context.getLoc(range),
                    messageId: MessageId.incorrectSorting
                });
            }
        }
    })
});
//# sourceMappingURL=sort-top-comments.js.map