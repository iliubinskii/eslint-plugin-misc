"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhaustiveSwitch = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["inexhaustiveSwitch"] = "inexhaustiveSwitch";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.exhaustiveSwitch = utils.createRule({
    name: "exhaustive-switch",
    vue: false,
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
            if (node.cases.some(switchCase => functions_1.is.null(switchCase.test))) {
                // Has default
            }
            else {
                const got = node.cases
                    .map(switchCase => switchCase.test)
                    .filter(functions_1.is.not.empty)
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