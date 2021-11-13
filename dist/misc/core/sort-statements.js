"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortStatements = exports.isStatementTypes = exports.isStatementType = exports.StatementType = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
var StatementType;
(function (StatementType) {
    StatementType["DeclareGlobal"] = "DeclareGlobal";
    StatementType["ExportAllDeclaration"] = "ExportAllDeclaration";
    StatementType["ExportDeclaration"] = "ExportDeclaration";
    StatementType["ExportDefaultDeclaration"] = "ExportDefaultDeclaration";
    StatementType["ExportFunctionDeclaration"] = "ExportFunctionDeclaration";
    StatementType["ExportTypeDeclaration"] = "ExportTypeDeclaration";
    StatementType["ExportUnknown"] = "ExportUnknown";
    StatementType["FunctionDeclaration"] = "FunctionDeclaration";
    StatementType["ImportDeclaration"] = "ImportDeclaration";
    StatementType["JestTest"] = "JestTest";
    StatementType["TypeDeclaration"] = "TypeDeclaration";
    StatementType["Unknown"] = "Unknown";
})(StatementType = exports.StatementType || (exports.StatementType = {}));
exports.isStatementType = functions_1.is.factory(functions_1.is.enumeration, StatementType);
exports.isStatementTypes = functions_1.is.factory(functions_1.is.array.of, exports.isStatementType);
exports.sortStatements = utils.createRule({
    name: "sort-statements",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: functions_1.is.object.factory({
        blockOrder: exports.isStatementTypes,
        moduleOrder: exports.isStatementTypes,
        order: exports.isStatementTypes,
        programOrder: exports.isStatementTypes
    }, {}),
    defaultOptions: {
        blockOrder: [],
        moduleOrder: [],
        order: [],
        programOrder: []
    },
    messages: utils.sort.messages,
    docs: {
        description: `
      Sorts statements.

      \`\`\`ts
      StatementType =
        | "DeclareGlobal"
        | "ExportAllDeclaration"
        | "ExportDeclaration"
        | "ExportDefaultDeclaration"
        | "ExportFunctionDeclaration"
        | "ExportTypeDeclaration"
        | "ExportUnknown"
        | "FunctionDeclaration"
        | "ImportDeclaration"
        | "JestTest"
        | "TypeDeclaration"
        | "Unknown";
      \`\`\`
    `,
        optionTypes: {
            blockOrder: "StatementType[]",
            moduleOrder: "StatementType[]",
            order: "StatementType[]",
            programOrder: "StatementType[]"
        },
        optionDescriptions: {
            blockOrder: "Order inside block statement",
            moduleOrder: "Order inside module declaration",
            order: "Default order",
            programOrder: "Root statements order"
        },
        failExamples: `
      function f() {}
      type T1 = number;
      const x1 = true;
      const x2 = true;
      export function g() {}
      export type T2 = number;
      export const x3 = true;
      export const x4 = true;
      export * from "source";
      declare global {}
      import "source";
    `,
        passExamples: `
      import "source";
      declare global {}
      export * from "source";
      export const x1 = true;
      export const x2 = true;
      export type T1 = number;
      export function f() {}
      const x3 = true;
      const x4 = true;
      type T2 = number;
      function g() {}
    `
    },
    create: (context) => {
        const { blockOrder, moduleOrder, order, programOrder } = context.options;
        return {
            BlockStatement: node => {
                utils.sort(node.body, context, {
                    sortingOrder: sortingOrder(_.uniq([...blockOrder, ...order, ...defaultOrder]))
                });
            },
            Program: node => {
                utils.sort(node.body, context, {
                    sortingOrder: sortingOrder(_.uniq([...programOrder, ...order, ...defaultOrder]))
                });
            },
            TSModuleBlock: node => {
                utils.sort(node.body, context, {
                    sortingOrder: sortingOrder(_.uniq([...moduleOrder, ...order, ...defaultOrder]))
                });
            }
        };
    }
});
const defaultOrder = [
    StatementType.ImportDeclaration,
    StatementType.DeclareGlobal,
    StatementType.ExportAllDeclaration,
    StatementType.ExportDeclaration,
    StatementType.ExportDefaultDeclaration,
    StatementType.ExportUnknown,
    StatementType.ExportTypeDeclaration,
    StatementType.ExportFunctionDeclaration,
    StatementType.Unknown,
    StatementType.TypeDeclaration,
    StatementType.FunctionDeclaration,
    StatementType.JestTest
];
const prepareForComparison = (0, functions_1.evaluate)(() => {
    const priority = ":,.";
    const keys = functions_1.a.fromString(priority);
    const values = functions_1.a.sort(functions_1.a.fromString(priority));
    const map = functions_1.o.fromEntries(keys.map((key, index) => [key, functions_1.a.get(values, index)]));
    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
    const re = new RegExp(`[${functions_1.s.escapeRegExpSpecialChars(priority)}]`, "gu");
    return (str) => str.replace(re, callback);
    function callback(char) {
        return map[char];
    }
});
const sortable = {
    [StatementType.DeclareGlobal]: true,
    [StatementType.ExportAllDeclaration]: true,
    [StatementType.ExportDeclaration]: true,
    [StatementType.ExportDefaultDeclaration]: false,
    [StatementType.ExportFunctionDeclaration]: true,
    [StatementType.ExportTypeDeclaration]: true,
    [StatementType.ExportUnknown]: false,
    [StatementType.FunctionDeclaration]: true,
    [StatementType.ImportDeclaration]: false,
    [StatementType.JestTest]: true,
    [StatementType.TypeDeclaration]: true,
    [StatementType.Unknown]: false
};
/**
 * Checks identifier name.
 *
 * @param node - Node.
 * @param names - Expected names.
 * @returns _True_ if node is an identifier with expected name, _false_ otherwise.
 */
function checkIdentifierName(node, ...names) {
    return node.type === utils_1.AST_NODE_TYPES.Identifier && names.includes(node.name);
}
/**
 * Returns Jest test name.
 *
 * @param node - Node.
 * @returns Test name if node contains Jest test, _undefined_ otherwise.
 */
function getJestTestName(node) {
    if (node.expression.type === utils_1.AST_NODE_TYPES.CallExpression) {
        const argument = node.expression.arguments[0];
        if (argument &&
            argument.type === utils_1.AST_NODE_TYPES.Literal &&
            functions_1.is.string(argument.value)) {
            const { callee } = node.expression;
            if ((callee.type === utils_1.AST_NODE_TYPES.Identifier && callee.name === "test") ||
                (callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    checkIdentifierName(callee.object, "test") &&
                    checkIdentifierName(callee.property, "only", "skip")) ||
                (callee.type === utils_1.AST_NODE_TYPES.CallExpression &&
                    callee.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    checkIdentifierName(callee.callee.object, "test") &&
                    checkIdentifierName(callee.callee.property, "each")) ||
                (callee.type === utils_1.AST_NODE_TYPES.CallExpression &&
                    callee.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    callee.callee.object.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    checkIdentifierName(callee.callee.object.object, "test") &&
                    checkIdentifierName(callee.callee.object.property, "only", "skip") &&
                    checkIdentifierName(callee.callee.property, "each")))
                return prepareForComparison(argument.value);
        }
    }
    return undefined;
}
/**
 * Creates sorting order function.
 *
 * @param order - Order.
 * @returns Sorting order function.
 */
function sortingOrder(order) {
    return node => {
        var _a;
        switch (node.type) {
            case utils_1.AST_NODE_TYPES.ExportAllDeclaration:
                return buildResult(StatementType.ExportAllDeclaration, `${node.source.value}\u0002${node.exportKind}`);
            case utils_1.AST_NODE_TYPES.ExportDefaultDeclaration:
                return buildResult(StatementType.ExportDefaultDeclaration);
            case utils_1.AST_NODE_TYPES.ExportNamedDeclaration:
                if (node.declaration)
                    switch (node.declaration.type) {
                        case utils_1.AST_NODE_TYPES.FunctionDeclaration:
                        case utils_1.AST_NODE_TYPES.TSDeclareFunction:
                            functions_1.assert.not.empty(node.declaration.id, "Expecting node ID");
                            return buildResult(StatementType.ExportFunctionDeclaration, node.declaration.id.name);
                        case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
                        case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
                            return buildResult(StatementType.ExportTypeDeclaration, node.declaration.id.name);
                        default:
                            return buildResult(StatementType.ExportUnknown);
                    }
                return buildResult(StatementType.ExportDeclaration, node.source ? `${node.source.value}\u0002${node.exportKind}` : "");
            case utils_1.AST_NODE_TYPES.ExpressionStatement: {
                const id = getJestTestName(node);
                return functions_1.is.not.empty(id)
                    ? buildResult(StatementType.JestTest, id)
                    : buildResult(StatementType.Unknown);
            }
            case utils_1.AST_NODE_TYPES.FunctionDeclaration:
            case utils_1.AST_NODE_TYPES.TSDeclareFunction:
                functions_1.assert.not.empty(node.id, "Expecting node ID");
                return buildResult(StatementType.FunctionDeclaration, node.id.name);
            case utils_1.AST_NODE_TYPES.ImportDeclaration:
                return buildResult(StatementType.ImportDeclaration);
            case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
            case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
                return buildResult(StatementType.TypeDeclaration, node.id.name);
            case utils_1.AST_NODE_TYPES.TSModuleDeclaration:
                return buildResult(((_a = node.global) !== null && _a !== void 0 ? _a : false)
                    ? StatementType.DeclareGlobal
                    : StatementType.Unknown);
            default:
                return buildResult(StatementType.Unknown);
        }
        function buildResult(type, id = "") {
            const order1 = 1000000 + order.indexOf(type);
            const order2 = sortable[type] ? id : "";
            const order3 = 1000000 + node.range[0];
            return `${order1}\u0001${order2}\u0001${order3}`;
        }
    };
}
//# sourceMappingURL=sort-statements.js.map