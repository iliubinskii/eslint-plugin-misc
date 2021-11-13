import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import { a, as, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";
import path from "node:path";

export interface Options {
  readonly format: utils.Casing;
}

export interface Suboptions {
  readonly _id: string;
  readonly format?: utils.Casing;
  readonly match: boolean;
  readonly selector: utils.Selector;
}

export enum MessageId {
  invalidFilename = "invalidFilename",
  invalidFilenameId = "invalidFilenameId"
}

export const consistentFilename = utils.createRule({
  name: "consistent-filename",
  vue: true,
  isOptions: is.object.factory<Options>({ format: utils.isCasing }, {}),
  defaultOptions: { format: utils.Casing.kebabCase },
  isSuboptions: is.object.factory<Suboptions>(
    { _id: is.string, match: is.boolean, selector: utils.isSelector },
    { format: utils.isCasing }
  ),
  defaultSuboptions: { match: false },
  suboptionsKey: "overrides",
  messages: {
    [MessageId.invalidFilename]: "Expecting file name to be: {{expected}}",
    [MessageId.invalidFilenameId]:
      "Expecting file name to be: {{expected}} ({{_id}})"
  },
  docs: {
    description: "Enforces consistent file name format.",
    optionTypes: { format: '"PascalCase" | "camelCase" | "kebab-case"' },
    optionDescriptions: { format: "Default file name format" },
    suboptionTypes: {
      _id: "string",
      format: '"PascalCase" | "camelCase" | "kebab-case"',
      match: "boolean",
      selector: "string | string[]"
    },
    suboptionDescriptions: {
      _id: "Id",
      format: "Overrides default file name format",
      match: "Apply override only if AST element's text matches file name",
      selector:
        "Triggers override when AST element matching AST selector is found"
    },
    failExamples: `
      // filename: SampleClass.ts
      /*
      eslint @skylib/consistent-filename: [
        error,
        {
          overrides: [
            {
              _id: "class",
              format: "kebab-case",

              match: true,
              selector: "ClassDeclaration > Identifier.id"
            }
          ]
        }
      ]
      */
      class SampleClass {}
    `,
    passExamples: `
      // filename: SampleClass.ts
      /*
      eslint @skylib/consistent-filename: [
        error,
        {
          overrides: [
            {
              _id: "class",
              format: "PascalCase",
              match: true,
              selector: "ClassDeclaration > Identifier.id"
            }
          ]
        }
      ]
      */
      class SampleClass {}
    `
  },
  create: (context): RuleListener => {
    const items: Writable<Items> = [];

    return utils.mergeListeners(
      ...context.options.overrides.map((suboptions): RuleListener => {
        const selector = utils.selector(suboptions.selector);

        return {
          [selector]: (node: TSESTree.Node) => {
            items.push({ node, suboptions });
          }
        };
      }),
      {
        "Program:exit": () => {
          const { base: got } = path.parse(context.filename);

          if (items.length) {
            const item = a.last(items);

            const { _id, format, match } = {
              format: context.options.format,
              ...item.suboptions
            };

            const expected = getExpected(got, format, match, item.node);

            if (got === expected) {
              // Valid
            } else
              context.report({
                data: { _id, expected },
                loc: context.locZero,
                messageId: MessageId.invalidFilenameId
              });
          } else {
            const expected = getExpected(got, context.options.format);

            if (got === expected) {
              // Valid
            } else
              context.report({
                data: { expected },
                loc: context.locZero,
                messageId: MessageId.invalidFilename
              });
          }
        }
      }
    );

    function getExpected(
      got: string,
      format: utils.Casing,
      match = false,
      node?: TSESTree.Node
    ): string {
      return got
        .split(".")
        .map((part, index) =>
          index === 0
            ? utils.setCasing(
                match ? utils.nodeText(as.not.empty(node), part) : part,
                format
              )
            : _.kebabCase(part)
        )
        .join(".");
    }
  }
});

interface Item {
  readonly node: TSESTree.Node;
  readonly suboptions: Suboptions;
}

type Items = readonly Item[];
