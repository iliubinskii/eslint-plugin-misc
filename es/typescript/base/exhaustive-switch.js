import * as _ from "lodash-commonjs-es";
import * as utils from "../../utils";
import { is } from "real-fns";
export var MessageId;
(function (MessageId) {
    MessageId["inexhaustiveSwitch"] = "inexhaustiveSwitch";
})(MessageId || (MessageId = {}));
export const exhaustiveSwitch = utils.createRule({
    name: "exhaustive-switch",
    messages: { [MessageId.inexhaustiveSwitch]: "Inexhaustive switch" },
    docs: {
        description: "Checks exhaustiveness of switch statement.",
        failExamples: `
      function f(x: 1 | 2): void {
        switch (x) {
          case 1:
        }
      }
    `,
        passExamples: `
      function f(x: 1 | 2): void {
        switch (x) {
          case 1:
          case 2:
        }
      }
    `
    },
    create: (context, typeCheck) => ({
        SwitchStatement: node => {
            if (node.cases.some(switchCase => is.null(switchCase.test))) {
                // Has default
            }
            else {
                const got = node.cases
                    .map(switchCase => switchCase.test)
                    .filter(is.not.empty)
                    .flatMap(expression => typeCheck.typeParts(expression));
                const expected = typeCheck.typeParts(node.discriminant);
                if (_.difference(expected, got).length)
                    context.report({
                        messageId: MessageId.inexhaustiveSwitch,
                        node: node.discriminant
                    });
            }
        }
    })
});
//# sourceMappingURL=exhaustive-switch.js.map