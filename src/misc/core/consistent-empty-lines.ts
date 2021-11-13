import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, as, evaluate, is, s } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";

export interface Suboptions {
  readonly _id: string;
  readonly emptyLine: EmptyLine;
  readonly next?: utils.Selector;
  readonly prev?: utils.Selector;
  readonly selector?: utils.Selector;
}

export enum EmptyLine {
  always = "always",
  any = "any",
  never = "never"
}

export enum MessageId {
  addEmptyLine = "addEmptyLine",
  removeEmptyLine = "removeEmptyLine"
}

export const consistentEmptyLines = evaluate(() => {
  const isEmptyLine = is.factory(is.enumeration, EmptyLine);

  const isSuboptions = is.object.factory<Suboptions>(
    { _id: is.string, emptyLine: isEmptyLine },
    {
      next: utils.isSelector,
      prev: utils.isSelector,
      selector: utils.isSelector
    }
  );

  return utils.createRule({
    name: "consistent-empty-lines",
    fixable: utils.Fixable.whitespace,
    vue: true,
    isSuboptions,
    suboptionsKey: "rules",
    messages: {
      [MessageId.addEmptyLine]: "Add empty line before ({{_id}})",
      [MessageId.removeEmptyLine]: "Remove empty line before ({{_id}})"
    },
    docs: {
      description: "Requires consistent empty lines.",
      suboptionTypes: {
        _id: "string",
        emptyLine: '"always" | "any" | "never"',
        next: "string | string[]",
        prev: "string | string[]",
        selector: "string | string[]"
      },
      suboptionDescriptions: {
        _id: "Id",
        emptyLine: "Requires or disallows empty line",
        next: "The second of the two adjustent AST selector (AST selector)",
        prev: "The first of the two adjustent AST elements (AST selector)",
        selector: "One selector for both adjustent AST elements (AST selector)"
      },
      failExamples: `
        /*
        eslint @skylib/consistent-empty-lines: [
          error,
          {
            rules: [
              {
                _id: "import",
                emptyLine: "always",
                selector: "ImportDeclaration"
              }
            ]
          }
        ]
        */
        import x from "source1";
        import y from "source2";
      `,
      passExamples: `
        /*
        eslint @skylib/consistent-empty-lines: [
          error,
          {
            rules: [
              {
                _id: "import",
                emptyLine: "never",
                selector: "ImportDeclaration"
              }
            ]
          }
        ]
        */
        import x from "source1";
        import y from "source2";
      `
    },
    create: (context): RuleListener => {
      const prevItems: Writable<Items> = [];

      const nextItems: Writable<Items> = [];

      return utils.mergeListeners(
        ...context.options.rules.flatMap((rule, index): utils.RuleListeners => {
          const prev = utils.selector(
            "prev" in rule ? rule.prev : as.not.empty(rule.selector)
          );

          const next = utils.selector(
            "next" in rule ? rule.next : as.not.empty(rule.selector)
          );

          return [
            {
              [prev]: (node: TSESTree.Node) => {
                prevItems.push({ index, node, rule });
              }
            },
            {
              [next]: (node: TSESTree.Node) => {
                nextItems.push({ index, node, rule });
              }
            }
          ];
        }),
        {
          "Program:exit": () => {
            // eslint-disable-next-line @skylib/functions/array/prefer-sort -- Ok
            prevItems.sort(reverseCompare);
            // eslint-disable-next-line @skylib/functions/array/prefer-sort -- Ok
            nextItems.sort(reverseCompare);

            const items = _.uniqBy(
              a.fromIterable(
                evaluate(function* (): Generator<Item> {
                  for (const prevItem of prevItems)
                    for (const nextItem of nextItems)
                      if (
                        prevItem.rule._id === nextItem.rule._id &&
                        context.isAdjacentNodes(prevItem.node, nextItem.node)
                      )
                        yield nextItem;
                })
              ),
              "node"
            );

            for (const item of items) {
              const { node, rule } = item;

              const { _id, emptyLine } = rule;

              if (emptyLine === EmptyLine.any) {
                // Skip check
              } else {
                const spread = evaluate(() => {
                  switch (emptyLine) {
                    case EmptyLine.always:
                      return true;

                    case EmptyLine.never:
                      return false;
                  }
                });

                const messageId = spread
                  ? MessageId.addEmptyLine
                  : MessageId.removeEmptyLine;

                const range = context.getLeadingSpaces(node);

                const got = context.getText(range);

                if (got.includes("\n")) {
                  const expected =
                    context.eol.repeat(spread ? 2 : 1) +
                    s.trimLeadingEmptyLines(got);

                  if (got === expected) {
                    // Valid
                  } else
                    context.report({
                      data: { _id },
                      fix: (): RuleFix => ({ range, text: expected }),
                      messageId,
                      node
                    });
                }
              }
            }
          }
        }
      );
    }
  });
});

interface Item {
  readonly index: number;
  readonly node: TSESTree.Node;
  readonly rule: Suboptions;
}

type Items = readonly Item[];

/**
 * Compares items.
 *
 * @param item1 - First item.
 * @param item2 - Second item.
 * @returns - Comparison result.
 */
function reverseCompare(item1: Item, item2: Item): number {
  return item2.index - item1.index;
}
