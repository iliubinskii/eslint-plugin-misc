import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import type { Writable, strings } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";

export interface Suboptions {
  readonly _id: string;
  readonly customOrder?: strings;
  readonly selector: utils.Selector;
  readonly sendToBottom?: string;
  readonly sendToTop?: string;
}

export enum MessageId {
  expectingObject = "expectingObject"
}

export const sortKeys = utils.createRule({
  name: "sort-keys",
  fixable: utils.Fixable.code,
  vue: true,
  isSuboptions: is.object.factory<Suboptions>(
    { _id: is.string, selector: utils.isSelector },
    { customOrder: is.strings, sendToBottom: is.string, sendToTop: is.string }
  ),
  suboptionsKey: "overrides",
  messages: {
    ...utils.sort.messages,
    [MessageId.expectingObject]: "Expecting object ({{_id}})"
  },
  docs: {
    description: "Sorts object keys.",
    suboptionTypes: {
      _id: "string",
      customOrder: "string[]",
      selector: "string | string[]",
      sendToBottom: "string",
      sendToTop: "string"
    },
    suboptionDescriptions: {
      _id: "Id",
      customOrder: "Array elements with custom order",
      selector: "AST elements to be sorted (AST selector)",
      sendToBottom: "Array elements that should be sent to bottom",
      sendToTop: "Array elements that should be sent to top"
    },
    failExamples: `
      export default {
        b: 1,
        a: 2
      }
    `,
    passExamples: `
      export default {
        a: 1,
        b: 2
      }
    `
  },
  create: (context): RuleListener => {
    const items: Writable<Items> = [];

    const overrides: Writable<Items> = [];

    return utils.mergeListeners(
      ...context.options.overrides.map((override): RuleListener => {
        const { _id, selector: mixedSelector } = override;

        const selector = utils.selector(mixedSelector);

        return {
          [selector]: (node: TSESTree.Node) => {
            if (node.type === AST_NODE_TYPES.ObjectExpression)
              overrides.push({ node, options: { ...override, keyNode } });
            else
              context.report({
                data: { _id },
                messageId: MessageId.expectingObject,
                node
              });
          }
        };
      }),
      {
        "ObjectExpression": node => {
          items.push({ node, options: { keyNode } });
        },
        "Program:exit": () => {
          for (const item of _.uniqBy([...overrides, ...items], "node"))
            utils.sort(item.node.properties, context, item.options);
        }
      }
    );

    function keyNode(node: ObjectMember): TSESTree.Node | undefined {
      return node.type === AST_NODE_TYPES.SpreadElement ? undefined : node.key;
    }
  }
});

interface Item {
  readonly node: TSESTree.ObjectExpression;
  readonly options: utils.sort.Options<ObjectMember>;
}

type Items = readonly Item[];

type ObjectMember =
  | TSESTree.MethodDefinition
  | TSESTree.Property
  | TSESTree.SpreadElement;
