// eslint-disable-next-line misc/disallow-import/typescript -- Ok
import type * as ts from "typescript";
import * as utils from "../../utils";
import type { Writable, strings } from "type-essentials";
import { a, evaluate, is } from "real-fns";
import type { AST } from "vue-eslint-parser";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export enum MessageId {
  noReadonlyProperty = "noReadonlyProperty"
}

export const noReadonlyVModel = utils.createRule({
  name: "no-readonly-v-model",
  // eslint-disable-next-line misc/require-syntax/require-vue-false -- Ok
  vue: true,
  messages: {
    [MessageId.noReadonlyProperty]:
      "Do not use readonly property as model value"
  },
  docs: {
    description: "Disallows using readonly property as model value.",
    failExamples: `
      <script lang="ts">
      export default defineComponent({
        setup: () => {
          const obj: SampleInterface = { x: 1 };

          return { obj };

          interface SampleInterface {
            readonly x: unknown;
          }
        }
      });
      </script>

      <template>
        <sample-component v-model="obj.x" />
      </template>
    `,
    passExamples: `
      <script lang="ts">
      export default defineComponent({
        setup: () => {
          const obj: SampleInterface = { x: 1 };

          return { obj };

          interface SampleInterface {
            x: unknown;
          }
        }
      });
      </script>

      <template>
        <sample-component v-model="obj.x" />
      </template>
    `
  },
  create: (context, typeCheck): RuleListener => {
    const directives: Writable<utils.AST.VDirectives> = [];

    // eslint-disable-next-line misc/real-fns/prefer-readonly-map -- Ok
    const variables = new Map<string, TSESTree.Node>();

    return {
      "Program:exit": () => {
        for (const directive of directives)
          if (directive.value && directive.value.expression) {
            const expression = directive.value.expression;

            if (
              expression.type === AST_NODE_TYPES.MemberExpression &&
              expression.object.type === AST_NODE_TYPES.Identifier &&
              expression.property.type === AST_NODE_TYPES.Identifier
            )
              lintDirective(
                directive,
                expression.object.name,
                expression.property.name
              );

            if (
              expression.type === AST_NODE_TYPES.MemberExpression &&
              expression.object.type === AST_NODE_TYPES.MemberExpression &&
              expression.object.object.type === AST_NODE_TYPES.Identifier &&
              expression.object.property.type === AST_NODE_TYPES.Identifier &&
              expression.property.type === AST_NODE_TYPES.Identifier
            )
              lintDirective(
                directive,
                expression.object.object.name,
                expression.object.property.name,
                expression.property.name
              );
          }
      },
      "Property[key.name=setup] > ArrowFunctionExpression > BlockStatement > ReturnStatement > ObjectExpression > Property":
        (node: TSESTree.Property) => {
          if (node.key.type === AST_NODE_TYPES.Identifier)
            variables.set(node.key.name, node.value);
        },
      "Property[key.name=setup] > ArrowFunctionExpression > ObjectExpression > Property":
        (node: TSESTree.Property) => {
          if (node.key.type === AST_NODE_TYPES.Identifier)
            variables.set(node.key.name, node.value);
        },
      "VAttribute": (node: AST.VAttribute | AST.VDirective) => {
        if (node.directive && node.key.name.name === "model")
          directives.push(node);
      }
    };

    function lintDirective(
      directive: AST.VDirective,
      name: string,
      ...path: strings
    ): void {
      const variable = variables.get(name);

      if (variable) {
        const type = evaluate(() => {
          const result = typeCheck.getType(variable);

          const symbol = result.getSymbol();

          if (symbol && ["ComputedRef", "Ref"].includes(symbol.name)) {
            const argType = typeCheck.getArgTypes(result)[0];

            if (argType) return argType;
          }

          return result;
        });

        lintType(directive, variable, type, ...path);
      }
    }

    function lintType(
      directive: AST.VDirective,
      variable: TSESTree.Node,
      type: ts.Type,
      ...path: strings
    ): void {
      const property = type.getProperty(a.first(path));

      if (is.not.empty(property))
        if (path.length > 1)
          lintType(
            directive,
            variable,
            typeCheck.getTypeBySymbol(property, variable),
            ...path.slice(1)
          );
        else if (typeCheck.isReadonlyProperty(property, type))
          context.report({
            loc: context.getLoc(directive.range),
            messageId: MessageId.noReadonlyProperty
          });
        else {
          // Valid
        }
    }
  }
});
