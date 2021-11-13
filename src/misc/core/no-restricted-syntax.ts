import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";
import { is } from "@skylib/functions";

export interface Options {
  readonly ignoreSelector: utils.Selector;
  readonly message?: string;
  readonly replacement?: string;
  readonly search?: string;
  readonly selector: utils.Selector;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const noRestrictedSyntax = utils.createRule({
  name: "no-restricted-syntax",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    { ignoreSelector: utils.isSelector, selector: utils.isSelector },
    { message: is.string, replacement: is.string, search: is.string }
  ),
  defaultOptions: { ignoreSelector: [] },
  messages: { [MessageId.customMessage]: "{{message}}" },
  docs: {
    description: "Disallows restricted syntax.",
    optionTypes: {
      ignoreSelector: "string | string[]",
      message: "string",
      replacement: "string",
      search: "string",
      selector: "string | string[]"
    },
    optionDescriptions: {
      ignoreSelector: "Allowed AST elements (AST selector)",
      message: "Custom message",
      replacement: "Replacement",
      search: "Serch term for replacement (regular expression)",
      selector: "Disallowed AST elements (AST selector)"
    },
    failExamples: `
      /*
      eslint @skylib/no-restricted-syntax: [
        error,
        {
          selector: "Identifier",
          ignoreSelector: "Identifier[name=y]",
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
          ignoreSelector: "Identifier[name=y]",
        }
      ]
      */
      const y = 1;
    `
  },
  create: (context): RuleListener => {
    const {
      ignoreSelector: mixedIgnoreSelector,
      message,
      replacement,
      search,
      selector: mixedSelector
    } = context.options;

    const selector = utils.selector(mixedSelector);

    const ignoreSelector = utils.selector(mixedIgnoreSelector);

    const nodes: Writable<utils.TSESTree.Nodes> = [];

    const ignoreNodes: Writable<utils.TSESTree.Nodes> = [];

    return utils.mergeListeners(
      {
        [selector]: (node: TSESTree.Node) => {
          nodes.push(node);
        }
      },
      {
        [ignoreSelector]: (node: TSESTree.Node) => {
          ignoreNodes.push(node);
        }
      },
      {
        "Program:exit": () => {
          for (const node of _.difference(nodes, ignoreNodes))
            context.report({
              data: {
                message: message ?? `This syntax is not allowed: ${selector}`
              },
              fix: (): utils.RuleFixes =>
                is.not.empty(replacement)
                  ? [
                      {
                        range: node.range,
                        text: is.not.empty(search)
                          ? context.getText(node).replace(
                              // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
                              new RegExp(search, "u"),
                              replacement
                            )
                          : replacement
                      }
                    ]
                  : [],
              messageId: MessageId.customMessage,
              node
            });
        }
      }
    );
  }
});
