import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly customOrder?: strings;
  readonly selector: utils.Selector;
  readonly sendToBottom?: string;
  readonly sendToTop?: string;
  readonly sortKey?: string;
  readonly triggerByComment: boolean;
}

export enum MessageId {
  expectingArray = "expectingArray"
}

export const sortArray = utils.createRule({
  name: "sort-array",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    { selector: utils.isSelector, triggerByComment: is.boolean },
    {
      customOrder: is.strings,
      sendToBottom: is.string,
      sendToTop: is.string,
      sortKey: is.string
    }
  ),
  defaultOptions: {
    selector: AST_NODE_TYPES.ArrayExpression,
    triggerByComment: true
  },
  messages: {
    ...utils.sort.messages,
    [MessageId.expectingArray]: "Expecting array"
  },
  docs: {
    description: "Sorts arrays.",
    optionTypes: {
      customOrder: "string[]",
      selector: "string | string[]",
      sendToBottom: "string",
      sendToTop: "string",
      sortKey: "string",
      triggerByComment: "boolean"
    },
    optionDescriptions: {
      customOrder: "Array elements with custom order",
      selector: "AST elements to be sorted (AST selector)",
      sendToBottom: "Array elements that should be sent to bottom",
      sendToTop: "Array elements that should be sent to top",
      sortKey: "Determines which object key should be used to compare objects",
      triggerByComment: 'Triggers sorting by "// @sorted" comment'
    },
    failExamples: `
      // @sorted
      const x = [2, 1];
    `,
    passExamples: `
      const x = [2, 1];
      // @sorted
      const y = [1, 2];
    `
  },
  create: (context): RuleListener => {
    const {
      selector: mixedSelector,
      sortKey,
      triggerByComment
    } = context.options;

    const selector = utils.selector(mixedSelector);

    return {
      [selector]: (node: TSESTree.Node) => {
        if (node.type === AST_NODE_TYPES.ArrayExpression) {
          const sort = triggerByComment
            ? context.getComments(node).includes("// @sorted")
            : true;

          if (sort)
            utils.sort(node.elements, context, { ...context.options, keyNode });
        } else context.report({ messageId: MessageId.expectingArray, node });
      }
    };

    function keyNode(node: TSESTree.Node): TSESTree.Node | undefined {
      switch (node.type) {
        case AST_NODE_TYPES.ObjectExpression:
          if (is.not.empty(sortKey))
            for (const property of node.properties)
              if (
                property.type === AST_NODE_TYPES.Property &&
                utils.nodeText(property.key, "?") === sortKey
              )
                return property.value;

          return node;

        case AST_NODE_TYPES.SpreadElement:
          return undefined;

        default:
          return node;
      }
    }
  }
});
