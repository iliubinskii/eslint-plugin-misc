import * as _ from "lodash-commonjs-es";
import * as utils from "../../utils";
import { a, is } from "real-fns";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "type-essentials";

export interface Suboptions {
  readonly _id: string;
  readonly format: utils.Casing;
  readonly selector: utils.Selector;
}

export enum MessageId {
  inconsistentMember = "inconsistentMember"
}

export const consistentEnumMembers = utils.createRule({
  name: "consistent-enum-members",
  vue: true,
  isSuboptions: is.object.factory<Suboptions>(
    { _id: is.string, format: utils.isCasing, selector: utils.isSelector },
    {}
  ),
  suboptionsKey: "overrides",
  messages: { [MessageId.inconsistentMember]: "Inconsistent key-value pair" },
  docs: {
    description:
      "Requires consistent key-value pairs inside enums (key should match value).",
    suboptionTypes: {
      _id: "string",
      format: '"PascalCase" | "camelCase" | "kebab-case"',
      selector: "string | string[]"
    },
    suboptionDescriptions: {
      _id: "Id",
      format: "Overrides default file name format",
      selector:
        "Triggers override when AST element matching AST selector is found"
    },
    failExamples: `
      enum Enum {
        a = "b"
      }
    `,
    passExamples: `
      enum Enum {
        a = "a"
      }
    `
  },
  create: (context): RuleListener => {
    const items: Writable<Items> = [];

    return utils.mergeListeners(
      ...context.options.overrides.map((suboptions): RuleListener => {
        const selector = utils.selector(suboptions.selector);

        return {
          [selector]: (node: TSESTree.Node) => {
            if (node.type === AST_NODE_TYPES.TSEnumMember)
              items.push({ node, suboptions });
          }
        };
      }),
      {
        "Program:exit": () => {
          const sortedItems = _.uniqBy(
            a.sort(items, reverseCompare),
            item => item.node
          );

          for (const item of sortedItems) {
            const { node, suboptions } = item;

            if (
              node.id.type === AST_NODE_TYPES.Identifier &&
              node.initializer &&
              node.initializer.type === AST_NODE_TYPES.Literal &&
              node.initializer.value !==
                utils.setCasing(node.id.name, suboptions?.format)
            )
              context.report({ messageId: MessageId.inconsistentMember, node });
          }
        },
        "TSEnumMember": node => {
          items.push({ node });
        }
      }
    );
  }
});

/**
 * Compares items.
 *
 * @param item1 - First item.
 * @param item2 - Second item.
 * @returns - Comparison result.
 */
function reverseCompare(item1: Item, item2: Item): number {
  if (item1.suboptions && item2.suboptions)
    return utils.compare(item2.suboptions._id, item1.suboptions._id);

  if (item2.suboptions) return 1;

  if (item1.suboptions) return -1;

  return 0;
}

interface Item {
  readonly node: TSESTree.TSEnumMember;
  readonly suboptions?: Suboptions;
}

type Items = readonly Item[];
