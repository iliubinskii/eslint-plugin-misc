"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortTopComments = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["incorrectSorting"] = "incorrectSorting";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.sortTopComments = utils.createRule({
    name: "sort-top-comments",
    fixable: utils.Fixable.code,
    vue: true,
    messages: Object.assign(Object.assign({}, utils.sort.messages), { [MessageId.incorrectSorting]: "Incorrect sorting" }),
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
            const expected = functions_1.a.sort(texts, utils.compare).join("\n");
            if (got === expected) {
                // Valid
            }
            else {
                const ranges = context.getCommentRanges(node);
                const range = [functions_1.a.first(ranges)[0], functions_1.a.last(ranges)[1]];
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