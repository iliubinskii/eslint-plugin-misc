import * as utils from "../../utils";
import { ReadonlySet, a, evaluate, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export interface Options {
  readonly classes: Style;
  readonly interfaces: Style;
}

export interface Suboptions {
  readonly _id: string;
  readonly pattern: utils.RegexpPattern;
  readonly propertyPattern: utils.RegexpPattern;
  readonly style: Style;
  readonly target?: Target;
}

export enum MessageId {
  combined = "combined",
  combinedId = "combinedId",
  optional = "optional",
  optionalId = "optionalId",
  undefined = "undefined",
  undefinedId = "undefinedId"
}

export enum Style {
  combined = "combined",
  optional = "optional",
  undefined = "undefined"
}

export enum Target {
  classes = "classes",
  interfaces = "interfaces"
}

export const isStyle = is.factory(is.enumeration, Style);

export const isTarget = is.factory(is.enumeration, Target);

export const consistentOptionalProps = utils.createRule({
  name: "consistent-optional-props",
  vue: false,
  isOptions: is.object.factory<Options>(
    { classes: isStyle, interfaces: isStyle },
    {}
  ),
  defaultOptions: { classes: Style.combined, interfaces: Style.combined },
  isSuboptions: is.object.factory<Suboptions>(
    {
      _id: is.string,
      pattern: utils.isRegexpPattern,
      propertyPattern: utils.isRegexpPattern,
      style: isStyle
    },
    { target: isTarget }
  ),
  defaultSuboptions: { pattern: [], propertyPattern: [] },
  suboptionsKey: "overrides",
  messages: {
    [MessageId.combined]: 'Use "x?: T | undefined" style instead',
    [MessageId.combinedId]: 'Use "x?: T | undefined" style instead ({{_id}})',
    [MessageId.optional]: 'Use "x?: T" style instead',
    [MessageId.optionalId]: 'Use "x?: T" style instead ({{_id}})',
    [MessageId.undefined]: 'Use "x: T | undefined" style instead',
    [MessageId.undefinedId]: 'Use "x: T | undefined" style instead ({{_id}})'
  },
  docs: {
    description: `
      Ensures consistent optional property style:
      - Combined syntax: "x?: T \\| undefined"
      - Only optional syntax: "x?: T"
      - Only undefined syntax: "x: T \\| undefined"
    `,
    optionTypes: {
      classes: '"combined" | "optional" | "undefined"',
      interfaces: '"combined" | "optional" | "undefined"'
    },
    optionDescriptions: {
      classes: "Prefered style for classes",
      interfaces: "Prefered style for interfaces"
    },
    suboptionTypes: {
      _id: "string",
      pattern: "string | string[]",
      propertyPattern: "string | string[]",
      style: '"combined" | "optional" | "undefined"',
      target: '"classes" | "interfaces"'
    },
    suboptionDescriptions: {
      _id: "Id",
      pattern: "Only for selected class/interface names (regular expression)",
      propertyPattern: "Only for selected property names (regular expression)",
      style: "Prefered style",
      target: "Classes or interfaces"
    },
    failExamples: `
      interface I {
        x?: string;
        y: string | undefined;
      }
    `,
    passExamples: `
      interface I {
        x?: string | undefined;
        y?: string | undefined;
      }
    `
  },
  create: (context, typeCheck): RuleListener => {
    const overrides = a
      .reverse(context.options.overrides)
      .map((override): SuboptionsExtended => {
        const { pattern, propertyPattern } = override;

        const matcher = utils.createRegexpMatcher(pattern, true);

        const properyMatcher = utils.createRegexpMatcher(propertyPattern, true);

        return { ...override, matcher, properyMatcher };
      });

    return {
      ClassDeclaration: lintClass,
      ClassExpression: lintClass,
      TSInterfaceDeclaration: lintInterface
    };

    function getPropertyName(
      node:
        | TSESTree.PropertyDefinition
        | TSESTree.TSAbstractPropertyDefinition
        | TSESTree.TSPropertySignature
    ): string {
      return utils.nodeText(node.key, () => context.getText(node.key));
    }

    function lintClass(
      node: TSESTree.ClassDeclaration | TSESTree.ClassExpression
    ): void {
      const name = node.id ? node.id.name : "?";

      for (const property of node.body.body)
        if (
          property.type === AST_NODE_TYPES.PropertyDefinition ||
          property.type === AST_NODE_TYPES.TSAbstractPropertyDefinition
        )
          lintProperty(property, Target.classes, name);
    }

    function lintInterface(node: TSESTree.TSInterfaceDeclaration): void {
      const name = node.id.name;

      for (const property of node.body.body)
        if (property.type === AST_NODE_TYPES.TSPropertySignature)
          lintProperty(property, Target.interfaces, name);
    }

    function lintProperty(
      node:
        | TSESTree.PropertyDefinition
        | TSESTree.TSAbstractPropertyDefinition
        | TSESTree.TSPropertySignature,
      target: Target,
      name: string
    ): void {
      if (node.typeAnnotation) {
        const { typeAnnotation } = node.typeAnnotation;

        const got = evaluate(() => {
          const type = typeCheck.getType(typeAnnotation);

          const hasUndefined = typeCheck.typeHas(
            type,
            utils.TypeGroup.undefined
          );

          const optional = node.optional ?? false;

          if (hasUndefined && optional) return Style.combined;

          if (hasUndefined) return Style.undefined;

          if (optional) return Style.optional;

          return undefined;
        });

        if (got) {
          const override = evaluate(() => {
            const propertyName = getPropertyName(node);

            const targets = new ReadonlySet([target, undefined]);

            return overrides.find(
              candidate =>
                targets.has(candidate.target) &&
                candidate.matcher(name) &&
                candidate.properyMatcher(propertyName)
            );
          });

          const expected = evaluate(() => {
            const result = override ? override.style : context.options[target];

            return exclusionTypes.has(typeAnnotation.type) &&
              exclusionStyles.has(got) &&
              exclusionStyles.has(result)
              ? undefined
              : result;
          });

          if (expected)
            if (got === expected) {
              // Valid
            } else
              context.report({
                data: override ? { _id: override._id } : {},
                messageId: evaluate(() => {
                  switch (expected) {
                    case Style.combined:
                      return override
                        ? MessageId.combinedId
                        : MessageId.combined;

                    case Style.optional:
                      return override
                        ? MessageId.optionalId
                        : MessageId.optional;

                    case Style.undefined:
                      return override
                        ? MessageId.undefinedId
                        : MessageId.undefined;
                  }
                }),
                node
              });
        }
      }
    }
  }
});

const exclusionTypes = new ReadonlySet([
  AST_NODE_TYPES.TSAnyKeyword,
  AST_NODE_TYPES.TSUnknownKeyword
]);

const exclusionStyles = new ReadonlySet([Style.combined, Style.optional]);

interface SuboptionsExtended extends Suboptions {
  readonly matcher: utils.Matcher;
  readonly properyMatcher: utils.Matcher;
}
