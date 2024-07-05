import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { is } from "typescript-misc";
export var InterfaceOption;
(function (InterfaceOption) {
    InterfaceOption["callSignatures"] = "callSignatures";
    InterfaceOption["constructSignatures"] = "constructSignatures";
    InterfaceOption["interface"] = "interface";
})(InterfaceOption || (InterfaceOption = {}));
export var MessageId;
(function (MessageId) {
    MessageId["undocumented"] = "undocumented";
    MessageId["undocumentedCallSignature"] = "undocumentedCallSignature";
    MessageId["undocumentedConstructSignature"] = "undocumentedConstructSignature";
})(MessageId || (MessageId = {}));
export const isInterfaceOption = is.factory(is.enumeration, InterfaceOption);
export const isInterfaceOptions = is.factory(is.array.of, isInterfaceOption);
export const requireJsdoc = utils.createRule({
    name: "require-jsdoc",
    isOptions: is.object.factory({
        excludeSelectors: is.strings,
        includeSelectors: is.strings,
        interfaces: isInterfaceOptions,
        noDefaultSelectors: is.boolean
    }, {}),
    defaultOptions: {
        excludeSelectors: [],
        includeSelectors: [],
        interfaces: [
            InterfaceOption.callSignatures,
            InterfaceOption.constructSignatures
        ],
        noDefaultSelectors: false
    },
    messages: {
        [MessageId.undocumented]: "Missing documentation",
        [MessageId.undocumentedCallSignature]: "Missing documentation for call signature",
        [MessageId.undocumentedConstructSignature]: "Missing documentation for constructor signature"
    },
    docs: {
        description: "Requires JSDoc documentation.",
        optionTypes: {
            excludeSelectors: "string[]",
            includeSelectors: "string[]",
            interfaces: '"callSignatures" | "constructSignatures" | "interface"',
            noDefaultSelectors: "boolean"
        },
        optionDescriptions: {
            excludeSelectors: "Skip these selectors",
            includeSelectors: "Check additional selectors",
            interfaces: 'Require documentation for interface ("interface"), call signatures ("callSignatures"), construct signatures ("constructSignatures")',
            noDefaultSelectors: "Do not check default selectors"
        },
        failExamples: "function f(): void {}",
        passExamples: `
      /**
       * Description.
       */
      function f(): void {}
    `
    },
    create: (context, typeCheck) => {
        const selector = utils.configurableSelector.get(context.options, defaultSelectors);
        return {
            [selector]: (node) => {
                if (hasOwnComment(node)) {
                    // Has doc comment
                }
                else
                    switch (node.type) {
                        case AST_NODE_TYPES.TSInterfaceDeclaration: {
                            lintInterface(node);
                            break;
                        }
                        case AST_NODE_TYPES.MethodDefinition:
                        case AST_NODE_TYPES.TSMethodSignature: {
                            lintMethod(node);
                            break;
                        }
                        default: {
                            lintNodeByTypeSymbol(node);
                        }
                    }
            }
        };
        function hasOwnComment(node) {
            if (context
                .getComments(node)
                .some(value => value.trimStart().startsWith("/**")))
                return true;
            if (node.parent) {
                if (node.type === AST_NODE_TYPES.TSFunctionType &&
                    node.parent.type === AST_NODE_TYPES.TSTypeAnnotation)
                    return hasOwnComment(node.parent);
                if (node.type === AST_NODE_TYPES.TSTypeAnnotation &&
                    node.parent.type === AST_NODE_TYPES.TSPropertySignature)
                    return hasOwnComment(node.parent);
            }
            return false;
        }
        function lintCallSignatures(node, type) {
            const hasDocComment = type
                .getCallSignatures()
                .every(signature => typeCheck.hasDocComment(signature));
            if (hasDocComment) {
                // Has doc comment
            }
            else
                context.report({
                    messageId: MessageId.undocumentedCallSignature,
                    node
                });
        }
        function lintConstructSignatures(node, type) {
            const hasDocComment = type
                .getConstructSignatures()
                .every(signature => typeCheck.hasDocComment(signature));
            if (hasDocComment) {
                // Has doc comment
            }
            else
                context.report({
                    messageId: MessageId.undocumentedConstructSignature,
                    node
                });
        }
        function lintInterface(node) {
            const { interfaces } = context.options;
            const type = typeCheck.getType(node);
            if (interfaces.includes(InterfaceOption.interface))
                lintNodeByTypeSymbol(node);
            if (interfaces.includes(InterfaceOption.callSignatures))
                lintCallSignatures(node, type);
            if (interfaces.includes(InterfaceOption.constructSignatures))
                lintConstructSignatures(node, type);
        }
        function lintMethod(node) {
            const type = typeCheck.getConstructorType(node);
            if (type)
                lintConstructSignatures(node, type);
            else
                lintNodeBySymbol(node.key);
        }
        function lintNodeBySymbol(node) {
            const symbol = typeCheck.getSymbol(node);
            if (symbol)
                if (typeCheck.hasDocComment(symbol)) {
                    // Has doc comment
                }
                else
                    context.report({ messageId: MessageId.undocumented, node });
        }
        function lintNodeByTypeSymbol(node) {
            const type = typeCheck.getType(node);
            const symbol = type.getSymbol();
            if (symbol)
                if (typeCheck.hasDocComment(symbol)) {
                    // Has doc comment
                }
                else
                    context.report({ messageId: MessageId.undocumented, node });
        }
    }
});
const defaultSelectors = [
    AST_NODE_TYPES.MethodDefinition,
    AST_NODE_TYPES.TSAbstractMethodDefinition,
    AST_NODE_TYPES.TSCallSignatureDeclaration,
    AST_NODE_TYPES.TSConstructSignatureDeclaration,
    AST_NODE_TYPES.TSDeclareFunction,
    AST_NODE_TYPES.TSInterfaceDeclaration,
    AST_NODE_TYPES.TSMethodSignature,
    ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > FunctionDeclaration",
    "PropertyDefinition > TSTypeAnnotation > TSFunctionType",
    "PropertyDefinition > TSTypeAnnotation > TSTypeLiteral > TSPropertySignature > TSTypeAnnotation > TSFunctionType",
    "PropertyDefinition[typeAnnotation=undefined] > :matches(ArrowFunctionExpression, FunctionExpression)",
    "TSPropertySignature > TSTypeAnnotation > TSFunctionType",
    "VariableDeclarator > Identifier.id > TSTypeAnnotation > TSFunctionType",
    "VariableDeclarator > Identifier.id > TSTypeAnnotation > TSTypeLiteral > TSPropertySignature > TSTypeAnnotation > TSFunctionType",
    "VariableDeclarator[id.typeAnnotation=undefined] > ObjectExpression > Property > :matches(ArrowFunctionExpression, FunctionExpression)"
];
//# sourceMappingURL=require-jsdoc.js.map