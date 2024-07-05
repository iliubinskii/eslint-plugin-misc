"use strict";
/* eslint-disable @typescript-eslint/no-var-requires -- Ok */
/* eslint-disable global-require -- Ok */
/* eslint-disable import/no-dynamic-require -- Ok */
/* eslint-disable security/detect-non-literal-require -- Ok */
/* eslint-disable unicorn/prefer-module -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_misc_1 = require("typescript-misc");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.wrap = utils.createRule({
    name: "wrap",
    fixable: utils.Fixable.code,
    hasSuggestions: true,
    isOptions: typescript_misc_1.is.object.factory({
        disableFix: typescript_misc_1.is.boolean,
        lint: utils.isSelector,
        plugin: typescript_misc_1.is.string,
        rule: typescript_misc_1.is.string,
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
        return utils.mergeListeners(rule.create(new Proxy({}, (0, typescript_misc_1.wrapProxyHandler)("eslint-wrap-rule", typescript_misc_1.ProxyHandlerAction.throw, {
            get: (_target, key) => key === "report"
                ? (report) => {
                    reports.push(report);
                }
                : typescript_misc_1.reflect.get(context.rawContext, key)
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
                const lintMatcher = lintIds.length
                    ? (report) => "node" in report && lintIds.includes(nodeId(report.node))
                    : () => true;
                const skipMatcher = skipIds.length
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
                                    typescript_misc_1.as.not
                                        .empty(rule.meta.messages[messageId])
                                        .replace(/\{\{\s*(\w+)\s*\}\}/gu, (_str, match1) => {
                                        const result = data[match1];
                                        return typescript_misc_1.as.numStr(result).toString();
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
 *
 * @param node - Node.
 * @returns Node ID.
 */
function nodeId(node) {
    return `${node.type}-${node.range[0]}-${node.range[1]}`;
}
//# sourceMappingURL=wrap.js.map