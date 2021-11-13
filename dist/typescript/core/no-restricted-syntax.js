"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRestrictedSyntax = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noRestrictedSyntax = utils.createRule({
    name: "no-restricted-syntax",
    fixable: utils.Fixable.code,
    vue: false,
    isOptions: functions_1.is.object.factory({
        checkArrayType: functions_1.is.boolean,
        checkReturnType: functions_1.is.boolean,
        ignoreSelector: utils.isSelector,
        selector: utils.isSelector
    }, {
        message: functions_1.is.string,
        replacement: functions_1.is.string,
        search: functions_1.is.string,
        typeHas: utils.isTypeGroup,
        typeHasNoneOf: utils.isTypeGroups,
        typeHasOneOf: utils.isTypeGroups,
        typeIs: utils.isTypeGroup,
        typeIsNoneOf: utils.isTypeGroups,
        typeIsOneOf: utils.isTypeGroups
    }),
    defaultOptions: {
        checkArrayType: false,
        checkReturnType: false,
        ignoreSelector: []
    },
    messages: { [MessageId.customMessage]: "{{message}}" },
    docs: {
        description: `
      Disallows restricted syntax.

      \`\`\`ts
      type TypeGroup =
        | "any"
        | "array"
        | "boolean"
        | "complex"
        | "function"
        | "never"
        | "null"
        | "number"
        | "object"
        | "parameter"
        | "readonly"
        | "string"
        | "symbol"
        | "tuple"
        | "undefined"
        | "unknown";
      \`\`\`
    `,
        optionTypes: {
            checkArrayType: "boolean",
            checkReturnType: "boolean",
            ignoreSelector: "string | string[]",
            message: "string",
            replacement: "string",
            search: "string",
            selector: "string | string[]",
            typeHas: "TypeGroup",
            typeHasNoneOf: "TypeGroup[]",
            typeHasOneOf: "TypeGroup[]",
            typeIs: "TypeGroup",
            typeIsNoneOf: "TypeGroup[]",
            typeIsOneOf: "TypeGroup[]"
        },
        optionDescriptions: {
            checkArrayType: "Check array argument type",
            checkReturnType: "Check function return type",
            ignoreSelector: "Allowed AST elements (AST selector)",
            message: "Custom message",
            replacement: "Replacement",
            search: "Serch term for replacement (regular expression)",
            selector: "Disallowed AST elements (AST selector)",
            typeHas: "Restrict syntax only if AST element's type includes given type",
            typeHasNoneOf: "Restrict syntax only if AST element's type includes none of given types",
            typeHasOneOf: "Restrict syntax only if AST element's type includes one of given types",
            typeIs: "Restrict syntax only if AST element's type is equal to given type",
            typeIsNoneOf: "Restrict syntax only if AST element's type is none of given types",
            typeIsOneOf: "Restrict syntax only if AST element's type is one of given types"
        },
        failExamples: `
      /*
      eslint @skylib/no-restricted-syntax: [
        error,
        {
          selector: "Identifier",
          typeIs: "number"
        }
      ]
      */
      const x = 1;
    `,
        passExamples: `
      /*
      eslint @skylib/no-restricted-syntax: [
        error,
        {
          selector: "Identifier",
          typeIs: "number"
        }
      ]
      */
      const x = "";
    `
    },
    create: (context, typeCheck) => {
        const { checkArrayType, checkReturnType, ignoreSelector: mixedIgnoreSelector, message, replacement, search, selector: mixedSelector, typeHas, typeHasNoneOf, typeHasOneOf, typeIs, typeIsNoneOf, typeIsOneOf } = context.options;
        const selector = utils.selector(mixedSelector);
        const ignoreSelector = utils.selector(mixedIgnoreSelector);
        const nodes = [];
        const ignoreNodes = [];
        return utils.mergeListeners({
            [selector]: (node) => {
                nodes.push(node);
            }
        }, {
            [ignoreSelector]: (node) => {
                ignoreNodes.push(node);
            }
        }, {
            "Program:exit": () => {
                for (const node of _.difference(nodes, ignoreNodes)) {
                    const types = (0, functions_1.evaluate)(() => {
                        const type = typeCheck.getType(node);
                        if (checkArrayType)
                            return typeCheck.isArrayOrTupleType(type) && type.typeArguments
                                ? type.typeArguments
                                : undefined;
                        if (checkReturnType)
                            return type.getCallSignatures().length
                                ? type
                                    .getCallSignatures()
                                    .map(signature => signature.getReturnType())
                                : undefined;
                        return [type];
                    });
                    if (types &&
                        types.every(type => typeCheck.typeIs(type, typeIs) &&
                            typeCheck.typeIsNoneOf(type, typeIsNoneOf) &&
                            typeCheck.typeIsOneOf(type, typeIsOneOf) &&
                            typeCheck.typeHas(type, typeHas) &&
                            typeCheck.typeHasNoneOf(type, typeHasNoneOf) &&
                            typeCheck.typeHasOneOf(type, typeHasOneOf)))
                        context.report({
                            data: {
                                message: message !== null && message !== void 0 ? message : `This syntax is not allowed: ${selector}`
                            },
                            fix: () => functions_1.is.not.empty(replacement)
                                ? [
                                    {
                                        range: node.range,
                                        text: functions_1.is.not.empty(search)
                                            ? context.getText(node).replace(
                                            // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
                                            new RegExp(search, "u"), replacement)
                                            : replacement
                                    }
                                ]
                                : [],
                            messageId: MessageId.customMessage,
                            node
                        });
                }
            }
        });
    }
});
//# sourceMappingURL=no-restricted-syntax.js.map