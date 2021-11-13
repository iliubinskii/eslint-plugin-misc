import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  triviallyInferrableType = "triviallyInferrableType"
}

export const noInferrableTypes = utils.createRule({
  name: "no-inferrable-types",
  vue: true,
  messages: {
    [MessageId.triviallyInferrableType]:
      "Type can be trivially inferred from initializer"
  },
  docs: {
    description: "Reports inferrable types.",
    failExamples: `
      function f<T>() {
        const x: T = {} as T;
      }

    `,
    passExamples: `
      function f<T>() {
        const x = {} as T;
      }
    `
  },
  create: (context): RuleListener => ({
    VariableDeclarator: node => {
      const { id, init } = node;

      if (
        id.typeAnnotation &&
        init &&
        init.type === AST_NODE_TYPES.TSAsExpression
      ) {
        const type1 = id.typeAnnotation.typeAnnotation;

        const type2 = init.typeAnnotation;

        const text1 = context.getText(type1);

        const text2 = context.getText(type2);

        if (text1 === text2)
          context.report({
            messageId: MessageId.triviallyInferrableType,
            node: type1
          });
      }
    }
  })
});
