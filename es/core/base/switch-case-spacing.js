import * as utils from "../../utils";
import { a, s } from "typescript-misc";
export var MessageId;
(function (MessageId) {
    MessageId["addEmptyLine"] = "addEmptyLine";
    MessageId["removeEmptyLine"] = "removeEmptyLine";
})(MessageId || (MessageId = {}));
export const switchCaseSpacing = utils.createRule({
    name: "switch-case-spacing",
    fixable: utils.Fixable.whitespace,
    messages: {
        [MessageId.addEmptyLine]: "Add empty line before switch case",
        [MessageId.removeEmptyLine]: "Remove empty line before switch case"
    },
    docs: {
        description: "Ensures consistent empty lines between switch case statements.",
        failExamples: `
      switch (x) {
        case 1:

        case 2:
          break;
        case 3:
      }
    `,
        passExamples: `
      switch (x) {
        case 1:
        case 2:
          break;

        case 3:
      }
    `
    },
    create: (context) => {
        return {
            SwitchStatement: node => {
                for (const [case1, case2] of a.chain(node.cases)) {
                    const fallThrough = case1.consequent.length === 0;
                    const range = context.getLeadingSpaces(case2);
                    const got = context.getText(range);
                    const expected = context.eol.repeat(fallThrough ? 1 : 2) +
                        s.trimLeadingEmptyLines(got);
                    if (got === expected) {
                        // Valid
                    }
                    else
                        context.report({
                            fix: () => {
                                return { range, text: expected };
                            },
                            messageId: fallThrough
                                ? MessageId.removeEmptyLine
                                : MessageId.addEmptyLine,
                            node: case2
                        });
                }
            }
        };
    }
});
//# sourceMappingURL=switch-case-spacing.js.map