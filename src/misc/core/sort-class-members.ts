import * as utils from "../../utils";
import { ReadonlyMap, ReadonlySet, evaluate, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly sortingOrder: strings;
}

export const sortClassMembers = utils.createRule({
  name: "sort-class-members",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>({ sortingOrder: is.strings }, {}),
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
  create: (context): RuleListener => {
    const sortingOrders = new ReadonlyMap(
      context.options.sortingOrder.map((name, index) => [name, index])
    );

    return {
      ClassBody: node => {
        utils.sort(node.body, context, {
          sortingOrder: member => {
            const x = getMemberAccessibility(member);

            const y = getMemberDynamicStatic(member);

            const types = getMemberTypes(member);

            const sortingOrder =
              1000 +
              Math.min(
                ...types.map(z =>
                  Math.min(
                    ...[
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
                    ].filter(is.not.empty)
                  )
                )
              );

            const name = getMemberName(member);

            const accessorType = getMemberAccessorType(member);

            return `${sortingOrder}\u0001${name}\u0001${accessorType}`;
          }
        });
      }
    };

    function getMemberName(node: TSESTree.ClassElement): string {
      switch (node.type) {
        case AST_NODE_TYPES.MethodDefinition:
        case AST_NODE_TYPES.PropertyDefinition:
        case AST_NODE_TYPES.TSAbstractMethodDefinition:
        case AST_NODE_TYPES.TSAbstractPropertyDefinition:
          return utils.nodeText(node.key, () => context.getText(node.key));

        case AST_NODE_TYPES.StaticBlock:
        case AST_NODE_TYPES.TSIndexSignature:
          return "";
      }
    }
  }
});

enum AccessorType {
  get = "get",
  none = "none",
  set = "set"
}

enum DynamicStatic {
  dynamic = "dynamic",
  static = "static"
}

enum Type {
  accessor = "accessor",
  block = "block",
  constructor = "constructor",
  field = "field",
  get = "get",
  method = "method",
  set = "set",
  signature = "signature"
}

const functionExpressions = new ReadonlySet([
  AST_NODE_TYPES.ArrowFunctionExpression,
  AST_NODE_TYPES.FunctionExpression
]);

type Types = readonly Type[];

/**
 * Returns member accessibility.
 *
 * @param node - Node.
 * @returns Member accessibility.
 */
function getMemberAccessibility(
  node: TSESTree.ClassElement
): TSESTree.Accessibility {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.PropertyDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
    case AST_NODE_TYPES.TSIndexSignature:
      return node.accessibility ?? "public";

    case AST_NODE_TYPES.StaticBlock:
      return "public";
  }
}

/**
 * Returns member accessor type.
 *
 * @param node - Node.
 * @returns Member accessor type.
 */
function getMemberAccessorType(node: TSESTree.ClassElement): AccessorType {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
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
function getMemberDynamicStatic(node: TSESTree.ClassElement): DynamicStatic {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.PropertyDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
    case AST_NODE_TYPES.TSIndexSignature:
      return node.static ?? false
        ? DynamicStatic.static
        : DynamicStatic.dynamic;

    case AST_NODE_TYPES.StaticBlock:
      return DynamicStatic.static;
  }
}

/**
 * Returns member types.
 *
 * @param node - Node.
 * @returns Member types.
 */
function getMemberTypes(node: TSESTree.ClassElement): Types {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
      return evaluate(() => {
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

    case AST_NODE_TYPES.PropertyDefinition:
      return node.value && functionExpressions.has(node.value.type)
        ? [Type.method]
        : [Type.field];

    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
      return [Type.field];

    case AST_NODE_TYPES.TSIndexSignature:
      return [Type.signature];

    case AST_NODE_TYPES.StaticBlock:
      return [Type.block];
  }
}
