import * as utils from "../../utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { a } from "@skylib/functions";

export enum MessageId {
  incorrectSorting = "incorrectSorting"
}

export const sortTopComments = utils.createRule({
  name: "sort-top-comments",
  fixable: utils.Fixable.code,
  vue: true,
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
  create: (context): RuleListener => ({
    "Program:exit": (node: TSESTree.Program) => {
      const texts = context.getComments(node);

      const got = texts.join("\n");

      const expected = a.sort(texts, utils.compare).join("\n");

      if (got === expected) {
        // Valid
      } else {
        const ranges = context.getCommentRanges(node);

        const range: utils.esRange = [a.first(ranges)[0], a.last(ranges)[1]];

        context.report({
          fix: (): RuleFix => ({ range, text: expected }),
          loc: context.getLoc(range),
          messageId: MessageId.incorrectSorting
        });
      }
    }
  })
});
