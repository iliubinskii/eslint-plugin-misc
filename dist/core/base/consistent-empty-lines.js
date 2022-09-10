"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentEmptyLines = exports.MessageId = exports.EmptyLine = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const real_fns_1 = require("real-fns");
var EmptyLine;
(function (EmptyLine) {
    EmptyLine["always"] = "always";
    EmptyLine["any"] = "any";
    EmptyLine["never"] = "never";
})(EmptyLine = exports.EmptyLine || (exports.EmptyLine = {}));
var MessageId;
(function (MessageId) {
    MessageId["addEmptyLine"] = "addEmptyLine";
    MessageId["removeEmptyLine"] = "removeEmptyLine";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.consistentEmptyLines = (0, real_fns_1.evaluate)(() => {
    const isEmptyLine = real_fns_1.is.factory(real_fns_1.is.enumeration, EmptyLine);
    const isSuboptions = real_fns_1.is.object.factory({ _id: real_fns_1.is.string, emptyLine: isEmptyLine }, {
        next: utils.isSelector,
        prev: utils.isSelector,
        selector: utils.isSelector
    });
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
                next: "The second of the two adjustent AST elements (AST selectors)",
                prev: "The first of the two adjustent AST elements (AST selectors)",
                selector: "One selector for both adjustent AST elements (AST selectors)"
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
                const prev = utils.selector("prev" in rule ? rule.prev : real_fns_1.as.not.empty(rule.selector));
                const next = utils.selector("next" in rule ? rule.next : real_fns_1.as.not.empty(rule.selector));
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
                    // eslint-disable-next-line misc/real-fns/array/prefer-sort -- Ok
                    prevItems.sort(reverseCompare);
                    // eslint-disable-next-line misc/real-fns/array/prefer-sort -- Ok
                    nextItems.sort(reverseCompare);
                    const items = _.uniqBy(real_fns_1.a.fromIterable((0, real_fns_1.evaluate)(function* () {
                        for (const prevItem of prevItems)
                            for (const nextItem of nextItems)
                                if (prevItem.rule._id === nextItem.rule._id &&
                                    context.isAdjacentNodes(prevItem.node, nextItem.node))
                                    yield nextItem;
                    })), "node");
                    for (const item of items) {
                        const { node, rule } = item;
                        const { _id, emptyLine } = rule;
                        if (emptyLine === EmptyLine.any) {
                            // Skip check
                        }
                        else {
                            const spread = (0, real_fns_1.evaluate)(() => {
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
                                const expected = context.eol.repeat(spread ? 2 : 1) +
                                    real_fns_1.s.trimLeadingEmptyLines(got);
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