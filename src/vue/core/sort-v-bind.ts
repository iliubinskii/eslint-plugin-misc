import * as utils from "../../utils";
import type { AST } from "vue-eslint-parser";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { a } from "@skylib/functions";

export enum MessageId {
  incorrectSortingOrder = "incorrectSortingOrder"
}

export const sortVBind = utils.createRule({
  name: "sort-v-bind",
  vue: true,
  messages: { [MessageId.incorrectSortingOrder]: "Incorrect sorting order" },
  docs: {
    description: 'Sorts "v-bind" directive.',
    failExamples: `
      <template>
        <slot v-bind="obj" prop="prop" @click="click"></slot>
      </template>
    `,
    passExamples: `
      <template>
        <slot prop="prop" v-bind="obj" @click="click"></slot>
      </template>
    `
  },
  create: (context): RuleListener => ({
    VStartTag: (node: AST.VStartTag) => {
      if (node.attributes.length > 1) {
        const vBindIndex = node.attributes.findIndex(
          attribute =>
            attribute.key.type === "VDirectiveKey" &&
            attribute.key.argument === null &&
            attribute.key.name.name === "bind"
        );

        if (
          vBindIndex >= 0 &&
          node.attributes.some(
            (attribute, index) => index > vBindIndex && !attribute.directive
          )
        )
          context.report({
            loc: context.getLoc(a.get(node.attributes, vBindIndex).range),
            messageId: MessageId.incorrectSortingOrder
          });
      }
    }
  })
});
