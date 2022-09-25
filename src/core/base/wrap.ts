/* eslint-disable misc/require-syntax/require-fix -- Ok */

import * as utils from "../../utils";
import {
  ProxyHandlerAction,
  as,
  is,
  reflect,
  wrapProxyHandler
} from "real-fns";
import type {
  RuleContext,
  RuleListener,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { Writable, strings } from "type-essentials";
import type { TSESTree } from "@typescript-eslint/utils";

export interface Options {
  readonly lint: utils.Selector;
  readonly plugin: string;
  readonly rule: string;
  readonly skip: utils.Selector;
}

export enum MessageId {
  customMessage = "customMessage"
}

export const wrap = utils.createRule({
  name: "wrap",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    {
      lint: utils.isSelector,
      plugin: is.string,
      rule: is.string,
      skip: utils.isSelector
    },
    {}
  ),
  defaultOptions: { lint: [], skip: [] },
  messages: { [MessageId.customMessage]: "{{message}}" },
  docs: {
    description: "Wraps and modifies third-party rule.",
    optionTypes: {
      lint: "string | string[]",
      plugin: "string",
      rule: "string",
      skip: "string | string[]"
    },
    optionDescriptions: {
      lint: "AST selectors to lint",
      plugin: "NPM package name",
      rule: "ESLint rule name",
      skip: "AST selectors to skip"
    },
    failExamples: `
      /*
      eslint misc/wrap: [
        error,
        {
          plugin: "@typescript-eslint/eslint-plugin",
          rule: "no-shadow"
        }
      ]
      */
      const value = 1;
      enum SampleEnum { value = "value" }
    `,
    passExamples: `
      /*
      eslint misc/wrap: [
        error,
        {
          skip: "TSEnumDeclaration *",
          plugin: "@typescript-eslint/eslint-plugin",
          rule: "no-shadow"
        }
      ]
      */
      const value = 1;
      enum SampleEnum { value = "value" }
    `
  },
  create: (context): RuleListener => {
    const {
      lint: mixedLint,
      plugin,
      rule: name,
      skip: mixedSkip
    } = context.options;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
    const rule: RuleModule<string> =
      plugin === "eslint"
        ? // eslint-disable-next-line misc/prefer-const-require -- Ok
          require(`${utils.projectRoot}node_modules/eslint/lib/rules/${name}`)
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, misc/prefer-const-require -- Ok
          require(plugin).rules[name];

    const lint = utils.selector(mixedLint);

    const skip = utils.selector(mixedSkip);

    const lintIds: Writable<strings> = [];

    const skipIds: Writable<strings> = [];

    const reports: Writable<utils.ReportDescriptors> = [];

    return utils.mergeListeners(
      rule.create(
        new Proxy(
          {} as Readonly<RuleContext<never, never>>,
          wrapProxyHandler("eslint-wrap-rule", ProxyHandlerAction.throw, {
            get: (_target, key) =>
              key === "report"
                ? (report: utils.ReportDescriptor) => {
                    reports.push(report);
                  }
                : reflect.get(context.rawContext, key)
          })
        )
      ),
      {
        [lint]: (node: TSESTree.Node) => {
          lintIds.push(nodeId(node));
        }
      },
      {
        [skip]: (node: TSESTree.Node) => {
          skipIds.push(nodeId(node));
        }
      },
      {
        "Program:exit": () => {
          const lintMatcher = lintIds.length
            ? (report: utils.ReportDescriptor) =>
                "node" in report && lintIds.includes(nodeId(report.node))
            : () => true;

          const skipMatcher = skipIds.length
            ? (report: utils.ReportDescriptor) =>
                "node" in report && skipIds.includes(nodeId(report.node))
            : () => false;

          for (const report of reports)
            if (lintMatcher(report) && !skipMatcher(report)) {
              const { data, messageId } = { data: {}, ...report } as const;

              const message = as.not
                .empty(rule.meta.messages[messageId])
                .replace(/\{\{\s*(\w+)\s*\}\}/gu, (_str, match1: string) => {
                  const result = data[match1];

                  return as.numStr(result).toString();
                });

              context.rawContext.report({
                ...report,
                data: { message },
                messageId: MessageId.customMessage
              });
            }
        }
      }
    );
  }
});

/**
 * Generates node ID.
 *
 * @param node - Node.
 * @returns Node ID.
 */
function nodeId(node: TSESTree.Node | TSESTree.Token): string {
  return `${node.type}-${node.range[0]}-${node.range[1]}`;
}
