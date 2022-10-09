import * as utils from "../../utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, evaluate, s } from "real-fns";
import type { AST } from "vue-eslint-parser";

export enum MessageId {
  addSpaces = "addSpaces",
  removeSpaces = "removeSpaces"
}

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
  create: (context): RuleListener => ({
    VElement: (node: AST.VElement) => {
      if (node.children.length) {
        const nodeText = context.getText(node.range);

        const range = evaluate(() => {
          const { children } = node;

          const first = a.first(children);

          const last = a.last(children);

          return [first.range[0], last.range[1]] as const;
        });

        const text = context.getText(range);

        const leadingSpaces = s.leadingSpaces(text);

        const trailingSpaces = s.trailingSpaces(text);

        if (s.multiline(nodeText) && (!leadingSpaces || !trailingSpaces))
          context.report({
            fix: (): RuleFix => ({ range, text: ` ${text.trim()} ` }),
            loc: context.getLoc(range),
            messageId: MessageId.addSpaces
          });

        if (s.singleLine(nodeText) && (leadingSpaces || trailingSpaces))
          context.report({
            fix: (): RuleFix => ({ range, text: text.trim() }),
            loc: context.getLoc(range),
            messageId: MessageId.removeSpaces
          });
      }
    }
  })
});
