import * as utils from "../../utils";
import { s } from "typescript-misc";
export var MessageId;
(function (MessageId) {
    MessageId["addEmptyLine"] = "addEmptyLine";
    MessageId["removeEmptyLine"] = "removeEmptyLine";
})(MessageId || (MessageId = {}));
export const commentSpacing = utils.createRule({
    name: "comment-spacing",
    fixable: utils.Fixable.whitespace,
    messages: {
        [MessageId.addEmptyLine]: "Add empty line after comment",
        [MessageId.removeEmptyLine]: "Remove empty line after comment"
    },
    docs: {
        description: "Requires consistent empty lines around comments.",
        failExamples: `
      // Comment
      function f() {}

      /** Comment */
      function g() {}

      /*
      Comment
      */

      function h() {}
    `,
        passExamples: `
      // Comment

      function f() {}

      /** Comment */

      function g() {}

      /*
      Comment
      */
      function h() {}
    `
    },
    create: (context) => {
        return {
            ":statement, TSDeclareFunction, TSExportAssignment": (node) => {
                for (const range of context.getCommentRanges(node)) {
                    const multiline = isMultiline(context.getText(range));
                    const nextMultiline = isMultiline(context.getText(range[1]));
                    const spread = multiline && !nextMultiline;
                    const got = s.leadingSpaces(context.getText(range[1]));
                    const expected = context.eol.repeat(spread ? 2 : 1) + s.trimLeadingEmptyLines(got);
                    if (got === expected) {
                        // Valid
                    }
                    else
                        context.report({
                            fix: () => {
                                return {
                                    range: [range[1], range[1] + got.length],
                                    text: expected
                                };
                            },
                            loc: context.getLoc(range),
                            messageId: spread
                                ? MessageId.addEmptyLine
                                : MessageId.removeEmptyLine
                        });
                }
            }
        };
    }
});
/**
 * Checks if string starts with multiline comment.
 * @param str - String.
 * @returns _True_ if string starts with multiline comment, _false_ otherwise.
 */
function isMultiline(str) {
    str = str.trimStart();
    return str.startsWith("/*") && !str.startsWith("/**");
}
//# sourceMappingURL=comment-spacing.js.map