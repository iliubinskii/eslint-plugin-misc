import * as _ from "lodash-commonjs-es";
import * as utils from "../../utils";
import { a, as, evaluate, is, s } from "typescript-misc";
export var EmptyLine;
(function (EmptyLine) {
    EmptyLine["always"] = "always";
    EmptyLine["any"] = "any";
    EmptyLine["commented"] = "commented";
    EmptyLine["never"] = "never";
})(EmptyLine || (EmptyLine = {}));
export var MessageId;
(function (MessageId) {
    MessageId["addEmptyLine"] = "addEmptyLine";
    MessageId["removeEmptyLine"] = "removeEmptyLine";
})(MessageId || (MessageId = {}));
export const consistentEmptyLines = evaluate(() => {
    const isEmptyLine = is.factory(is.enumeration, EmptyLine);
    const isSuboptions = is.object.factory({ _id: is.string, emptyLine: isEmptyLine }, {
        next: utils.isSelector,
        prev: utils.isSelector,
        selector: utils.isSelector
    });
    return utils.createRule({
        name: "consistent-empty-lines",
        fixable: utils.Fixable.whitespace,
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
                next: "The second of the two adjacent AST elements (AST selectors)",
                prev: "The first of the two adjacent AST elements (AST selectors)",
                selector: "One selector for both adjacent AST elements (AST selectors)"
            },
            failExamples: `
        /*
        eslint misc/consistent-empty-lines: [
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
        eslint misc/consistent-empty-lines: [
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
        create: (context) => {
            const prevItems = [];
            const nextItems = [];
            return utils.mergeListeners(...context.options.rules.flatMap((rule, index) => {
                const prev = utils.selector("prev" in rule ? rule.prev : as.not.empty(rule.selector));
                const next = utils.selector("next" in rule ? rule.next : as.not.empty(rule.selector));
                return [
                    {
                        [prev]: (node) => {
                            prevItems.push({ index, node, rule });
                        }
                    },
                    {
                        [next]: (node) => {
                            nextItems.push({ index, node, rule });
                        }
                    }
                ];
            }), {
                "Program:exit": () => {
                    prevItems.sort(reverseCompare);
                    nextItems.sort(reverseCompare);
                    const items = _.uniqBy(a.fromIterable(evaluate(function* () {
                        for (const prevItem of prevItems)
                            for (const nextItem of nextItems)
                                if (prevItem.rule._id === nextItem.rule._id &&
                                    context.isAdjacentNodes(prevItem.node, nextItem.node))
                                    yield { ...nextItem, prevNode: prevItem.node };
                    })), "node");
                    for (const item of items) {
                        const { node, prevNode, rule } = item;
                        const { _id, emptyLine } = rule;
                        if (emptyLine === EmptyLine.any) {
                            // Skip check
                        }
                        else {
                            const spread = evaluate(() => {
                                switch (emptyLine) {
                                    case EmptyLine.always:
                                        return true;
                                    case EmptyLine.commented:
                                        return (context.hasComments(node) ||
                                            context.hasComments(prevNode));
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
                                const expected = context.eol.repeat(spread ? 2 : 1) +
                                    s.trimLeadingEmptyLines(got);
                                if (got === expected) {
                                    // Valid
                                }
                                else
                                    context.report({
                                        data: { _id },
                                        fix: () => ({ range, text: expected }),
                                        messageId,
                                        node
                                    });
                            }
                        }
                    }
                }
            });
        }
    });
});
/**
 * Compares items.
 *
 * @param item1 - First item.
 * @param item2 - Second item.
 * @returns - Comparison result.
 */
function reverseCompare(item1, item2) {
    return item2.index - item1.index;
}
//# sourceMappingURL=consistent-empty-lines.js.map