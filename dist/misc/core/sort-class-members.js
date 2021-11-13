"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortClassMembers = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.sortClassMembers = utils.createRule({
    name: "sort-class-members",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: functions_1.is.object.factory({ sortingOrder: functions_1.is.strings }, {}),
    defaultOptions: { sortingOrder: [] },
    messages: utils.sort.messages,
    docs: {
        description: `
      Sorts class members by type and alphabetically inside each type group. Type groups:
      - Accessibility: "private", "protected", "public"
      - Accessor type: "get", "set"
      - Dynamic/static members: "dynamic", "static"
      - Type: "accessor", "block", "constructor", "field", "get", "method", "set", "signature"
      - Any combinations, e.g.: "protected-dynamic-accessor"
    `,
        optionTypes: { sortingOrder: "string[]" },
        optionDescriptions: { sortingOrder: "Sorting order" },
        failExamples: `
      class SampleClass {
        z;
        y;
        x;
      }
    `,
        passExamples: `
      class SampleClass {
        x;
        y;
        z;
      }
    `
    },
    create: (context) => {
        const sortingOrders = new functions_1.ReadonlyMap(context.options.sortingOrder.map((name, index) => [name, index]));
        return {
            ClassBody: node => {
                utils.sort(node.body, context, {
                    sortingOrder: member => {
                        const x = getMemberAccessibility(member);
                        const y = getMemberDynamicStatic(member);
                        const types = getMemberTypes(member);
                        const sortingOrder = 1000 +
                            Math.min(...types.map(z => Math.min(...[
                                1000,
                                sortingOrders.get(x),
                                sortingOrders.get(y),
                                sortingOrders.get(z),
                                sortingOrders.get(`${x}-${y}`),
                                sortingOrders.get(`${x}-${z}`),
                                sortingOrders.get(`${y}-${x}`),
                                sortingOrders.get(`${y}-${z}`),
                                sortingOrders.get(`${z}-${x}`),
                                sortingOrders.get(`${z}-${y}`),
                                sortingOrders.get(`${x}-${y}-${z}`),
                                sortingOrders.get(`${x}-${z}-${y}`),
                                sortingOrders.get(`${y}-${x}-${z}`),
                                sortingOrders.get(`${y}-${z}-${x}`),
                                sortingOrders.get(`${z}-${x}-${y}`),
                                sortingOrders.get(`${z}-${y}-${x}`)
                            ].filter(functions_1.is.not.empty))));
                        const name = getMemberName(member);
                        const accessorType = getMemberAccessorType(member);
                        return `${sortingOrder}\u0001${name}\u0001${accessorType}`;
                    }
                });
            }
        };
        function getMemberName(node) {
            switch (node.type) {
                case utils_1.AST_NODE_TYPES.MethodDefinition:
                case utils_1.AST_NODE_TYPES.PropertyDefinition:
                case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
                case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
                    return utils.nodeText(node.key, () => context.getText(node.key));
                case utils_1.AST_NODE_TYPES.StaticBlock:
                case utils_1.AST_NODE_TYPES.TSIndexSignature:
                    return "";
            }
        }
    }
});
var AccessorType;
(function (AccessorType) {
    AccessorType["get"] = "get";
    AccessorType["none"] = "none";
    AccessorType["set"] = "set";
})(AccessorType || (AccessorType = {}));
var DynamicStatic;
(function (DynamicStatic) {
    DynamicStatic["dynamic"] = "dynamic";
    DynamicStatic["static"] = "static";
})(DynamicStatic || (DynamicStatic = {}));
var Type;
(function (Type) {
    Type["accessor"] = "accessor";
    Type["block"] = "block";
    Type["constructor"] = "constructor";
    Type["field"] = "field";
    Type["get"] = "get";
    Type["method"] = "method";
    Type["set"] = "set";
    Type["signature"] = "signature";
})(Type || (Type = {}));
const functionExpressions = new functions_1.ReadonlySet([
    utils_1.AST_NODE_TYPES.ArrowFunctionExpression,
    utils_1.AST_NODE_TYPES.FunctionExpression
]);
/**
 * Returns member accessibility.
 *
 * @param node - Node.
 * @returns Member accessibility.
 */
function getMemberAccessibility(node) {
    var _a;
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.MethodDefinition:
        case utils_1.AST_NODE_TYPES.PropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSIndexSignature:
            return (_a = node.accessibility) !== null && _a !== void 0 ? _a : "public";
        case utils_1.AST_NODE_TYPES.StaticBlock:
            return "public";
    }
}
/**
 * Returns member accessor type.
 *
 * @param node - Node.
 * @returns Member accessor type.
 */
function getMemberAccessorType(node) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.MethodDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
            switch (node.kind) {
                case "get":
                    return AccessorType.get;
                case "set":
                    return AccessorType.set;
                default:
                    return AccessorType.none;
            }
        default:
            return AccessorType.none;
    }
}
/**
 * Returns member dynamic/static state.
 *
 * @param node - Node.
 * @returns Member dynamic/static state.
 */
function getMemberDynamicStatic(node) {
    var _a;
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.MethodDefinition:
        case utils_1.AST_NODE_TYPES.PropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSIndexSignature:
            return ((_a = node.static) !== null && _a !== void 0 ? _a : false)
                ? DynamicStatic.static
                : DynamicStatic.dynamic;
        case utils_1.AST_NODE_TYPES.StaticBlock:
            return DynamicStatic.static;
    }
}
/**
 * Returns member types.
 *
 * @param node - Node.
 * @returns Member types.
 */
function getMemberTypes(node) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.MethodDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
            return (0, functions_1.evaluate)(() => {
                switch (node.kind) {
                    case "constructor":
                        return [Type.constructor];
                    case "get":
                        return [Type.accessor, Type.get];
                    case "method":
                        return [Type.method];
                    case "set":
                        return [Type.accessor, Type.set];
                }
            });
        case utils_1.AST_NODE_TYPES.PropertyDefinition:
            return node.value && functionExpressions.has(node.value.type)
                ? [Type.method]
                : [Type.field];
        case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
            return [Type.field];
        case utils_1.AST_NODE_TYPES.TSIndexSignature:
            return [Type.signature];
        case utils_1.AST_NODE_TYPES.StaticBlock:
            return [Type.block];
    }
}
//# sourceMappingURL=sort-class-members.js.map