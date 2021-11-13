// eslint-disable-next-line @skylib/disallow-import/typescript -- Ok
import type * as ts from "typescript";
import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";

export type InterfaceOptions = readonly InterfaceOption[];

export interface Options extends utils.configurableSelector.Options {
  readonly interfaces: InterfaceOptions;
  readonly properties: PropertyOptions;
}

export type PropertyOptions = readonly PropertyOption[];

export enum PropertyOption {
  function = "function",
  nonFunction = "nonFunction"
}

export const isPropertyOption = is.factory(is.enumeration, PropertyOption);

export const isPropertyOptions = is.factory(is.array.of, isPropertyOption);

export enum InterfaceOption {
  callSignatures = "callSignatures",
  constructSignatures = "constructSignatures",
  interface = "interface"
}

export enum MessageId {
  undocumented = "undocumented",
  undocumentedCallSignature = "undocumentedCallSignature",
  undocumentedConstructSignature = "undocumentedConstructSignature"
}

export const isInterfaceOption = is.factory(is.enumeration, InterfaceOption);

export const isInterfaceOptions = is.factory(is.array.of, isInterfaceOption);

export const requireJsdoc = utils.createRule({
  name: "require-jsdoc",
  vue: false,
  isOptions: is.object.factory<Options>(
    {
      excludeSelectors: is.strings,
      includeSelectors: is.strings,
      interfaces: isInterfaceOptions,
      noDefaultSelectors: is.boolean,
      properties: isPropertyOptions
    },
    {}
  ),
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
    [MessageId.undocumentedCallSignature]:
      "Missing documentation for call signature",
    [MessageId.undocumentedConstructSignature]:
      "Missing documentation for constructor signature"
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
      interfaces:
        'Require documenation for interface ("interface"), call signatures ("callSignatures"), construct signatures ("constructSignatures")',
      noDefaultSelectors: "Do not check default selectors",
      properties:
        'Require documenation for function properties ("function"), non-function properties ("nonFunction")'
    },
    failExamples: "function f(): void {}",
    passExamples: `
      /**
       * Description.
       */
      function f(): void {}
    `
  },
  create: (context, typeCheck): RuleListener => {
    const selector = utils.configurableSelector.get(
      context.options,
      defaultSelectors
    );

    return {
      [selector]: (node: TSESTree.Node) => {
        switch (node.type) {
          case AST_NODE_TYPES.TSInterfaceDeclaration:
            lintInterface(node);

            break;

          case AST_NODE_TYPES.MethodDefinition:
          case AST_NODE_TYPES.TSMethodSignature:
            lintMethod(node);

            break;

          case AST_NODE_TYPES.PropertyDefinition:
          case AST_NODE_TYPES.TSPropertySignature:
            lintProperty(node);

            break;

          default:
            lintNodeByTypeSymbol(node);
        }
      }
    };

    function lintCallSignatures(node: TSESTree.Node, type: ts.Type): void {
      const hasDocComment = type
        .getCallSignatures()
        .every(signature => typeCheck.hasDocComment(signature));

      if (hasDocComment) {
        // Valid
      } else
        context.report({
          messageId: MessageId.undocumentedCallSignature,
          node
        });
    }

    function lintConstructSignatures(node: TSESTree.Node, type: ts.Type): void {
      const hasDocComment = type
        .getConstructSignatures()
        .every(signature => typeCheck.hasDocComment(signature));

      if (hasDocComment) {
        // Valid
      } else
        context.report({
          messageId: MessageId.undocumentedConstructSignature,
          node
        });
    }

    function lintInterface(node: TSESTree.TSInterfaceDeclaration): void {
      const { interfaces } = context.options;

      const type = typeCheck.getType(node);

      if (interfaces.includes(InterfaceOption.interface))
        lintNodeByTypeSymbol(node);

      if (interfaces.includes(InterfaceOption.callSignatures))
        lintCallSignatures(node, type);

      if (interfaces.includes(InterfaceOption.constructSignatures))
        lintConstructSignatures(node, type);
    }

    function lintMethod(
      node: TSESTree.MethodDefinition | TSESTree.TSMethodSignature
    ): void {
      const type = typeCheck.getConstructorType(node);

      if (type) lintConstructSignatures(node, type);
      else lintNodeBySymbol(node.key);
    }

    function lintNodeBySymbol(node: TSESTree.Node): void {
      const symbol = typeCheck.getSymbol(node);

      if (symbol)
        if (typeCheck.hasDocComment(symbol)) {
          // Valid
        } else context.report({ messageId: MessageId.undocumented, node });
    }

    // eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
    function lintNodeByTypeSymbol(node: TSESTree.Node): void {
      const type = typeCheck.getType(node);

      const symbol = type.getSymbol();

      if (symbol)
        if (typeCheck.hasDocComment(symbol)) {
          // Valid
        } else context.report({ messageId: MessageId.undocumented, node });
    }

    function lintProperty(
      node: TSESTree.PropertyDefinition | TSESTree.TSPropertySignature
    ): void {
      const { properties } = context.options;

      const { key, typeAnnotation } = node;

      if (typeAnnotation) {
        const type = typeAnnotation.typeAnnotation.type;

        if (
          type === AST_NODE_TYPES.TSFunctionType
            ? properties.includes(PropertyOption.function)
            : properties.includes(PropertyOption.nonFunction)
        )
          lintNodeBySymbol(key);
      }
    }
  }
});

const defaultSelectors: strings = [
  AST_NODE_TYPES.ClassDeclaration,
  AST_NODE_TYPES.FunctionDeclaration,
  AST_NODE_TYPES.MethodDefinition,
  AST_NODE_TYPES.PropertyDefinition,
  AST_NODE_TYPES.TSAbstractMethodDefinition,
  AST_NODE_TYPES.TSCallSignatureDeclaration,
  AST_NODE_TYPES.TSConstructSignatureDeclaration,
  AST_NODE_TYPES.TSDeclareFunction,
  AST_NODE_TYPES.TSInterfaceDeclaration,
  AST_NODE_TYPES.TSMethodSignature,
  AST_NODE_TYPES.TSPropertySignature
];
