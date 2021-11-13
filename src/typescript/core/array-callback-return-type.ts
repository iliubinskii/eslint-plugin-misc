import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { ReadonlySet } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  invalidType = "invalidType"
}

export const arrayCallbackReturnType = utils.createRule({
  name: "array-callback-return-type",
  vue: false,
  messages: { [MessageId.invalidType]: "Expecting boolean return type" },
  docs: {
    description: "Requires boolean return type in array callbacks.",
    failExamples: "[1, true].every(x => x);",
    passExamples: `
      [1].every(x => x);
      [""].every(x => x);
      [false].every(x => x);
    `
  },
  create: (context, typeCheck): RuleListener => ({
    CallExpression: node => {
      const { callee } = node;

      if (
        callee.type === AST_NODE_TYPES.MemberExpression &&
        callee.property.type === AST_NODE_TYPES.Identifier &&
        arrayCallbacks.has(callee.property.name) &&
        typeCheck.isArrayOrTuple(callee.object)
      ) {
        const argument = node.arguments[0];

        if (argument) {
          const isSafeBooleanCondition = typeCheck
            .getCallSignatures(argument)
            .map(typeCheck.getReturnType)
            .every(typeCheck.isSafeBooleanCondition);

          if (isSafeBooleanCondition) {
            // Valid
          } else
            context.report({
              messageId: MessageId.invalidType,
              node: argument
            });
        }
      }
    }
  })
});

const arrayCallbacks = new ReadonlySet(["some", "every"]);
