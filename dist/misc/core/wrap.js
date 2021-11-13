"use strict";
/* eslint-disable @skylib/require-syntax/require-fix -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.wrap = utils.createRule({
    name: "wrap",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: functions_1.is.object.factory({
        lint: utils.isSelector,
        plugin: functions_1.is.string,
        rule: functions_1.is.string,
        skip: utils.isSelector
    }, {}),
    defaultOptions: { lint: [], skip: [] },
    messages: { [MessageId.customMessage]: "{{message}}" },
    docs: {
        description: "Wraps third-party rule.",
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
      eslint @skylib/wrap: [
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
      eslint @skylib/wrap: [
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
        const plugin = require(context.options.plugin);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
        const rule = plugin.rules[context.options.rule];
        const lint = utils.selector(context.options.lint);
        const skip = utils.selector(context.options.skip);
        const lintIds = [];
        const skipIds = [];
        const reports = [];
        return utils.mergeListeners(rule.create(new Proxy({}, (0, functions_1.wrapProxyHandler)("eslint-wrap-rule", functions_1.ProxyHandlerAction.throw, {
            get: (_target, key) => key === "report"
                ? (report) => {
                    reports.push(report);
                }
                : functions_1.reflect.get(context.rawContext, key)
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
                        const { data, messageId } = Object.assign({ data: {} }, report);
                        const message = functions_1.as.not
                            .empty(rule.meta.messages[messageId])
                            .replace(/\{\{\s*(\w+)\s*\}\}/gu, (_str, match1) => {
                            const result = data[match1];
                            return functions_1.as.numStr(result).toString();
                        });
                        context.rawContext.report(Object.assign(Object.assign({}, report), { data: { message }, messageId: MessageId.customMessage }));
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