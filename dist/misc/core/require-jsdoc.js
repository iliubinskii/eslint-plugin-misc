"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJsdoc = exports.isInterfaceOptions = exports.isInterfaceOption = exports.MessageId = exports.InterfaceOption = exports.isPropertyOptions = exports.isPropertyOption = exports.PropertyOption = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
const functions_1 = require("@skylib/functions");
var PropertyOption;
(function (PropertyOption) {
    PropertyOption["function"] = "function";
    PropertyOption["nonFunction"] = "nonFunction";
})(PropertyOption = exports.PropertyOption || (exports.PropertyOption = {}));
exports.isPropertyOption = functions_1.is.factory(functions_1.is.enumeration, PropertyOption);
exports.isPropertyOptions = functions_1.is.factory(functions_1.is.array.of, exports.isPropertyOption);
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
exports.isInterfaceOption = functions_1.is.factory(functions_1.is.enumeration, InterfaceOption);
exports.isInterfaceOptions = functions_1.is.factory(functions_1.is.array.of, exports.isInterfaceOption);
exports.requireJsdoc = utils.createRule({
    name: "require-jsdoc",
    vue: false,
    isOptions: functions_1.is.object.factory({
        excludeSelectors: functions_1.is.strings,
        includeSelectors: functions_1.is.strings,
        interfaces: exports.isInterfaceOptions,
        noDefaultSelectors: functions_1.is.boolean,
        properties: exports.isPropertyOptions
    }, {}),
    defaultOptions: {
        excludeSelectors: [],
        includeSelectors: [],
        interfaces: [
            InterfaceOption.callSignatures,
            InterfaceOption.constructSignatures,
            InterfaceOption.interface
        ],
        noDefaultSelectors: false,
        properties: [PropertyOption.function, PropertyOption.nonFunction]
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
            noDefaultSelectors: "boolean",
            properties: 'Array<"function" | "nonFunction">'
        },
        optionDescriptions: {
            excludeSelectors: "Skip these selectors",
            includeSelectors: "Check additional selectors",
            interfaces: 'Require documenation for interface ("interface"), call signatures ("callSignatures"), construct signatures ("constructSignatures")',
            noDefaultSelectors: "Do not check default selectors",
            properties: 'Require documenation for function properties ("function"), non-function properties ("nonFunction")'
        },
        failExamples: `
      function f(): void {}
    `,
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
                switch (node.type) {
                    case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
                        lintInterface(node);
                        break;
                    case utils_1.AST_NODE_TYPES.MethodDefinition:
                    case utils_1.AST_NODE_TYPES.TSMethodSignature:
                        lintMethod(node);
                        break;
                    case utils_1.AST_NODE_TYPES.PropertyDefinition:
                    case utils_1.AST_NODE_TYPES.TSPropertySignature:
                        lintProperty(node);
                        break;
                    default:
                        lintNodeByTypeSymbol(node);
                }
            }
        };
        function lintCallSignatures(node, type) {
            const hasDocComment = type
                .getCallSignatures()
                .every(signature => typeCheck.hasDocComment(signature));
            if (hasDocComment) {
                // Valid
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
                // Valid
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
                    // Valid
                }
                else
                    context.report({ messageId: MessageId.undocumented, node });
        }
        // eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
        function lintNodeByTypeSymbol(node) {
            const type = typeCheck.getType(node);
            const symbol = type.getSymbol();
            if (symbol)
                if (typeCheck.hasDocComment(symbol)) {
                    // Valid
                }
                else
                    context.report({ messageId: MessageId.undocumented, node });
        }
        function lintProperty(node) {
            const { properties } = context.options;
            const { key, typeAnnotation } = node;
            if (typeAnnotation) {
                const type = typeAnnotation.typeAnnotation.type;
                if (type === utils_1.AST_NODE_TYPES.TSFunctionType
                    ? properties.includes(PropertyOption.function)
                    : properties.includes(PropertyOption.nonFunction))
                    lintNodeBySymbol(key);
            }
        }
    }
});
const defaultSelectors = [
    utils_1.AST_NODE_TYPES.ClassDeclaration,
    utils_1.AST_NODE_TYPES.FunctionDeclaration,
    utils_1.AST_NODE_TYPES.MethodDefinition,
    utils_1.AST_NODE_TYPES.PropertyDefinition,
    utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition,
    utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration,
    utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration,
    utils_1.AST_NODE_TYPES.TSDeclareFunction,
    utils_1.AST_NODE_TYPES.TSInterfaceDeclaration,
    utils_1.AST_NODE_TYPES.TSMethodSignature,
    utils_1.AST_NODE_TYPES.TSPropertySignature
];
//# sourceMappingURL=require-jsdoc.js.map