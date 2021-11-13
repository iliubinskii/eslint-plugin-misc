import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";
import { is } from "@skylib/functions";

export interface Options {
  readonly message?: string;
  readonly once: boolean;
  readonly selector: utils.Selector;
  readonly trigger: utils.Selector;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const requireSyntax = utils.createRule({
  name: "require-syntax",
  vue: true,
  isOptions: is.object.factory<Options>(
    { once: is.boolean, selector: utils.isSelector, trigger: utils.isSelector },
    { message: is.string }
  ),
  defaultOptions: { once: false, trigger: "Program" },
  messages: { [MessageId.customMessage]: "{{message}}" },
  docs: {
    description: "Requires script to contain syntax.",
    optionTypes: {
      message: "string",
      once: "boolean",
      selector: "string | string[]",
      trigger: "string | string[]"
    },
    optionDescriptions: {
      message: "Custom message",
      once: "Syntax should be found exactly one time",
      selector: "AST selector",
      trigger: "Trigger rule by AST selector"
    },
    failExamples: `
      /*
      eslint @skylib/require-syntax: [
        error,
        {
          selector: "Identifier[name=x]",
          trigger: "Identifier[name=y]"
        }
      ]
      */
      export const y = 1;
    `,
    passExamples: `
      /*
      eslint @skylib/require-syntax: [
        error,
        {
          selector: "Identifier[name=x]",
          trigger: "Identifier[name=y]"
        }
      ]
      */
      export const x = 1;
      export const y = 1;
    `
  },
  create: (context): RuleListener => {
    const {
      message,
      once,
      selector: mixedSelector,
      trigger: mixedTrigger
    } = context.options;

    const selector = utils.selector(mixedSelector);

    const trigger = utils.selector(mixedTrigger);

    let count = 0;

    const nodes: Writable<utils.TSESTree.Nodes> = [];

    return utils.mergeListeners(
      {
        [selector]: () => {
          count++;
        }
      },
      {
        [trigger]: (node: TSESTree.Node) => {
          nodes.push(node);
        }
      },
      {
        "Program:exit": () => {
          for (const node of nodes)
            if (count === 0 || (count > 1 && once)) {
              const defaultMessage =
                count === 0
                  ? `Missing syntax: ${selector}`
                  : `Require syntax once: ${selector}`;

              const loc =
                trigger === "Program"
                  ? context.locZero
                  : context.getLoc(node.range);

              context.report({
                data: { message: message ?? defaultMessage },
                loc,
                messageId: MessageId.customMessage
              });
            }
        }
      }
    );
  }
});
