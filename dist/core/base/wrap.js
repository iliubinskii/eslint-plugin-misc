"use strict";
/* eslint-disable misc/require-syntax/require-fix -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const real_fns_1 = require("real-fns");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.wrap = utils.createRule({
    name: "wrap",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: real_fns_1.is.object.factory({
        lint: utils.isSelector,
        plugin: real_fns_1.is.string,
        rule: real_fns_1.is.string,
        skip: utils.isSelector
    }, {}),
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
    create: (context) => {
        const { lint: mixedLint, plugin, rule: name, skip: mixedSkip } = context.options;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
        const rule = plugin === "eslint"
            ? // eslint-disable-next-line misc/prefer-const-require -- Ok
                require(`${utils.projectRoot}node_modules/eslint/lib/rules/${name}`)
            : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, misc/prefer-const-require -- Ok
                require(plugin).rules[name];
        const lint = utils.selector(mixedLint);
        const skip = utils.selector(mixedSkip);
        const lintIds = [];
        const skipIds = [];
        const reports = [];
        return utils.mergeListeners(rule.create(new Proxy({}, (0, real_fns_1.wrapProxyHandler)("eslint-wrap-rule", real_fns_1.ProxyHandlerAction.throw, {
            get: (_target, key) => key === "report"
                ? (report) => {
                    reports.push(report);
                }
                : real_fns_1.reflect.get(context.rawContext, key)
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
                        const message = real_fns_1.as.not
                            .empty(rule.meta.messages[messageId])
                            .replace(/\{\{\s*(\w+)\s*\}\}/gu, (_str, match1) => {
                            const result = data[match1];
                            return real_fns_1.as.numStr(result).toString();
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