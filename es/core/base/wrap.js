/* eslint-disable @typescript-eslint/no-var-requires -- Ok */
/* eslint-disable global-require -- Ok */
/* eslint-disable import/no-dynamic-require -- Ok */
/* eslint-disable misc/prefer-const-require -- Ok */
/* eslint-disable security/detect-non-literal-require -- Ok */
/* eslint-disable unicorn/prefer-module -- Ok */
import * as utils from "../../utils";
import { ProxyHandlerAction, as, is, reflect, wrapProxyHandler } from "typescript-misc";
export var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId || (MessageId = {}));
export const wrap = utils.createRule({
    name: "wrap",
    fixable: utils.Fixable.code,
    hasSuggestions: true,
    isOptions: is.object.factory({
        disableFix: is.boolean,
        lint: utils.isSelector,
        plugin: is.string,
        rule: is.string,
        skip: utils.isSelector
    }, {}),
    defaultOptions: { disableFix: false, lint: [], skip: [] },
    messages: { [MessageId.customMessage]: "{{message}}" },
    docs: {
        description: "Wraps and modifies third-party rule.",
        optionTypes: {
            disableFix: "boolean",
            lint: "string | string[]",
            plugin: "string",
            rule: "string",
            skip: "string | string[]"
        },
        optionDescriptions: {
            disableFix: "Disables fix",
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
    create: (context) => {
        const { disableFix, lint: mixedLint, plugin, rule: name, skip: mixedSkip } = context.options;
        const rule = (plugin === "eslint"
            ? require(`${utils.projectRoot}node_modules/eslint/lib/rules/${name}`)
            : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
                require(plugin).rules[name]);
        const lint = utils.selector(mixedLint);
        const skip = utils.selector(mixedSkip);
        const lintIds = [];
        const skipIds = [];
        const reports = [];
        return utils.mergeListeners(rule.create(new Proxy({}, wrapProxyHandler("eslint-wrap-rule", ProxyHandlerAction.throw, {
            get: (_target, key) => key === "report"
                ? (report) => {
                    reports.push(report);
                }
                : reflect.get(context.rawContext, key)
        }))), {
            [lint]: (node) => {
                lintIds.push(nodeId(node));
            }
        }, {
            [skip]: (node) => {
                skipIds.push(nodeId(node));
            }
        }, {
            "Program:exit": () => {
                const lintMatcher = lintIds.length > 0
                    ? (report) => "node" in report && lintIds.includes(nodeId(report.node))
                    : () => true;
                const skipMatcher = skipIds.length > 0
                    ? (report) => "node" in report && skipIds.includes(nodeId(report.node))
                    : () => false;
                for (const report of reports)
                    if (lintMatcher(report) && !skipMatcher(report)) {
                        const { data, fix, message, messageId, ...rest } = {
                            data: {},
                            // eslint-disable-next-line unicorn/no-null -- Ok
                            fix: null,
                            message: undefined,
                            ...report
                        };
                        context.rawContext.report({
                            ...rest,
                            data: {
                                message: message ??
                                    as.not
                                        .empty(rule.meta.messages[messageId])
                                        .replaceAll(/\{\{\s*(\w+)\s*\}\}/gu, (_str, match1) => {
                                        const result = data[match1];
                                        return as.numStr(result).toString();
                                    })
                            },
                            // eslint-disable-next-line unicorn/no-null -- Ok
                            fix: disableFix ? null : fix,
                            messageId: MessageId.customMessage
                        });
                    }
            }
        });
    }
});
/**
 * Generates node ID.
 * @param node - Node.
 * @returns Node ID.
 */
function nodeId(node) {
    return `${node.type}-${node.range[0]}-${node.range[1]}`;
}
//# sourceMappingURL=wrap.js.map