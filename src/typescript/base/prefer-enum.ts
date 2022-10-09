// eslint-disable-next-line misc/disallow-import/typescript -- Ok
import type * as ts from "typescript";
import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "real-fns";

export enum MessageId {
  // eslint-disable-next-line misc/max-identifier-blocks -- Ok
  preferEnumToStringLiteral = "preferEnumToStringLiteral",
  // eslint-disable-next-line misc/max-identifier-blocks -- Ok
  preferEnumToStringUnionType = "preferEnumToStringUnionType"
}

export const preferEnum = utils.createRule({
  name: "prefer-enum",
  vue: false,
  messages: {
    [MessageId.preferEnumToStringLiteral]: "Use enum instead of string literal",
    [MessageId.preferEnumToStringUnionType]:
      "Use enum instead of string union type"
  },
  docs: {
    description: "Requires using enums instead of string literals.",
    failExamples: 'type T = "a" | "b";',
    passExamples: `
      enum T {
        a = "a",
        b = "b"
      };
    `
  },
  create: (context, typeCheck): RuleListener => {
    return {
      BinaryExpression: (node: TSESTree.BinaryExpression) => {
        const { left, operator, right } = node;

        if (["===", "!=="].includes(operator)) {
          if (left.type === AST_NODE_TYPES.Literal)
            lintLiteral(left, typeCheck.getType(right));

          if (right.type === AST_NODE_TYPES.Literal)
            lintLiteral(right, typeCheck.getType(left));
        }
      },
      Literal: (node: TSESTree.Literal) => {
        lintLiteral(node, typeCheck.getContextualType(node));
      },
      TSTypeAliasDeclaration: node => {
        const { id, typeAnnotation } = node;

        if (
          typeAnnotation.type === AST_NODE_TYPES.TSUnionType &&
          typeAnnotation.types.every(
            typeNode =>
              typeNode.type === AST_NODE_TYPES.TSLiteralType &&
              typeNode.literal.type === AST_NODE_TYPES.Literal &&
              is.string(typeNode.literal.value)
          )
        )
          context.report({
            messageId: MessageId.preferEnumToStringUnionType,
            node: id
          });
      }
    };

    function lintLiteral(node: TSESTree.Node, type: ts.Type | undefined): void {
      if (
        type &&
        (typeCheck.isEnumLiteralType(type) ||
          (type.isUnion() &&
            type.types.every(
              subtype =>
                typeCheck.isEnumLiteralType(subtype) ||
                typeCheck.isUndefinedType(subtype)
            )))
      )
        context.report({
          messageId: MessageId.preferEnumToStringLiteral,
          node
        });
    }
  }
});
