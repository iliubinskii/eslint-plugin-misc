"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferEnum = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
const typescript_misc_1 = require("typescript-misc");
var MessageId;
(function (MessageId) {
    MessageId["preferEnumToStringLiteral"] = "preferEnumToStringLiteral";
    MessageId["preferEnumToStringUnionType"] = "preferEnumToStringUnionType";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.preferEnum = utils.createRule({
    name: "prefer-enum",
    messages: {
        [MessageId.preferEnumToStringLiteral]: "Use enum instead of string literal",
        [MessageId.preferEnumToStringUnionType]: "Use enum instead of string union type"
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
    create: (context, typeCheck) => {
        return {
            BinaryExpression: (node) => {
                const { left, operator, right } = node;
                if (["===", "!=="].includes(operator)) {
                    if (left.type === utils_1.AST_NODE_TYPES.Literal)
                        lintLiteral(left, typeCheck.getType(right));
                    if (right.type === utils_1.AST_NODE_TYPES.Literal)
                        lintLiteral(right, typeCheck.getType(left));
                }
            },
            Literal: (node) => {
                lintLiteral(node, typeCheck.getContextualType(node));
            },
            TSTypeAliasDeclaration: node => {
                const { id, typeAnnotation } = node;
                if (typeAnnotation.type === utils_1.AST_NODE_TYPES.TSUnionType &&
                    typeAnnotation.types.every(typeNode => typeNode.type === utils_1.AST_NODE_TYPES.TSLiteralType &&
                        typeNode.literal.type === utils_1.AST_NODE_TYPES.Literal &&
                        typescript_misc_1.is.string(typeNode.literal.value)))
                    context.report({
                        messageId: MessageId.preferEnumToStringUnionType,
                        node: id
                    });
            }
        };
        function lintLiteral(node, type) {
            if (type &&
                (typeCheck.isEnumLiteralType(type) ||
                    (type.isUnion() &&
                        type.types.every(subtype => typeCheck.isEnumLiteralType(subtype) ||
                            typeCheck.isUndefinedType(subtype)))))
                context.report({
                    messageId: MessageId.preferEnumToStringLiteral,
                    node
                });
        }
    }
});
//# sourceMappingURL=prefer-enum.js.map