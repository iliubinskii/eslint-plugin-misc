"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJsdoc = exports.isInterfaceOptions = exports.isInterfaceOption = exports.MessageId = exports.InterfaceOption = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
const real_fns_1 = require("real-fns");
var InterfaceOption;
(function (InterfaceOption) {
    InterfaceOption["callSignatures"] = "callSignatures";
    InterfaceOption["constructSignatures"] = "constructSignatures";
    InterfaceOption["interface"] = "interface";
})(InterfaceOption = exports.InterfaceOption || (exports.InterfaceOption = {}));
var MessageId;
(function (MessageId) {
    MessageId["undocumented"] = "undocumented";
    MessageId["undocumentedCallSignature"] = "undocumentedCallSignature";
    MessageId["undocumentedConstructSignature"] = "undocumentedConstructSignature";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.isInterfaceOption = real_fns_1.is.factory(real_fns_1.is.enumeration, InterfaceOption);
exports.isInterfaceOptions = real_fns_1.is.factory(real_fns_1.is.array.of, exports.isInterfaceOption);
exports.requireJsdoc = utils.createRule({
    name: "require-jsdoc",
    vue: false,
    isOptions: real_fns_1.is.object.factory({
        excludeSelectors: real_fns_1.is.strings,
        includeSelectors: real_fns_1.is.strings,
        interfaces: exports.isInterfaceOptions,
        noDefaultSelectors: real_fns_1.is.boolean
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
            interfaces: 'Require documenation for interface ("interface"), call signatures ("callSignatures"), construct signatures ("constructSignatures")',
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
                        case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
                            lintInterface(node);
                            break;
                        case utils_1.AST_NODE_TYPES.MethodDefinition:
                        case utils_1.AST_NODE_TYPES.TSMethodSignature:
                            lintMethod(node);
                            break;
                        default:
                            lintNodeByTypeSymbol(node);
                    }
            }
        };
        function hasOwnComment(node) {
            if (context
                .getComments(node)
                .some(value => value.trimStart().startsWith("/**")))
                return true;
            if (node.parent) {
                if (node.type === utils_1.AST_NODE_TYPES.TSFunctionType &&
                    node.parent.type === utils_1.AST_NODE_TYPES.TSTypeAnnotation)
                    return hasOwnComment(node.parent);
                if (node.type === utils_1.AST_NODE_TYPES.TSTypeAnnotation &&
                    node.parent.type === utils_1.AST_NODE_TYPES.TSPropertySignature)
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
        // eslint-disable-next-line misc/max-identifier-blocks -- Ok
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
    utils_1.AST_NODE_TYPES.MethodDefinition,
    utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition,
    utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration,
    utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration,
    utils_1.AST_NODE_TYPES.TSDeclareFunction,
    utils_1.AST_NODE_TYPES.TSInterfaceDeclaration,
    utils_1.AST_NODE_TYPES.TSMethodSignature,
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