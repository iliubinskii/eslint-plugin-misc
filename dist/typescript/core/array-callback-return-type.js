"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayCallbackReturnType = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["invalidType"] = "invalidType";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.arrayCallbackReturnType = utils.createRule({
    name: "array-callback-return-type",
    vue: false,
    messages: { [MessageId.invalidType]: "Expecting boolean return type" },
    docs: {
        description: "Requires boolean return type in array callbacks.",
        failExamples: `
      [1, true].every(x => x);
    `,
        passExamples: `
      [1].every(x => x);
      [""].every(x => x);
      [false].every(x => x);
    `
    },
    create: (context, typeCheck) => ({
        CallExpression: node => {
            const { callee } = node;
            if (callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                callee.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                arrayCallbacks.has(callee.property.name) &&
                typeCheck.isArrayOrTuple(callee.object)) {
                const argument = node.arguments[0];
                if (argument) {
                    const isSafeBooleanCondition = typeCheck
                        .getCallSignatures(argument)
                        .map(typeCheck.getReturnType)
                        .every(typeCheck.isSafeBooleanCondition);
                    if (isSafeBooleanCondition) {
                        // Valid
                    }
                    else
                        context.report({
                            messageId: MessageId.invalidType,
                            node: argument
                        });
                }
            }
        }
    })
});
const arrayCallbacks = new functions_1.ReadonlySet(["some", "every"]);
//# sourceMappingURL=array-callback-return-type.js.map