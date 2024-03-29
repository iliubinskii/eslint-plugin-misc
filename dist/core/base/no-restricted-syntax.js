"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRestrictedSyntax = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_misc_1 = require("typescript-misc");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.noRestrictedSyntax = utils.createRule({
    name: "no-restricted-syntax",
    fixable: utils.Fixable.code,
    isOptions: typescript_misc_1.is.object.factory({ ignoreSelector: utils.isSelector, selector: utils.isSelector }, { message: typescript_misc_1.is.string, replacement: typescript_misc_1.is.string, search: typescript_misc_1.is.string }),
    defaultOptions: { ignoreSelector: [] },
    messages: { [MessageId.customMessage]: "{{message}}" },
    docs: {
        description: "Disallows AST syntax (an extended version of ESLint core rule).",
        optionTypes: {
            ignoreSelector: "string | string[]",
            message: "string",
            replacement: "string",
            search: "string",
            selector: "string | string[]"
        },
        optionDescriptions: {
            ignoreSelector: "Allowed AST elements (AST selectors)",
            message: "Custom message",
            replacement: "Replacement",
            search: "Search term for replacement (regular expression)",
            selector: "Disallowed AST elements (AST selectors)"
        },
        failExamples: `
      /*
      eslint misc/no-restricted-syntax: [
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
      eslint misc/no-restricted-syntax: [
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
    create: (context) => {
        const { ignoreSelector: mixedIgnoreSelector, message, replacement, search, selector: mixedSelector } = context.options;
        const selector = utils.selector(mixedSelector);
        const ignoreSelector = utils.selector(mixedIgnoreSelector);
        const nodes = [];
        const ignoreNodes = [];
        return utils.mergeListeners({
            [selector]: (node) => {
                nodes.push(node);
            }
        }, {
            [ignoreSelector]: (node) => {
                ignoreNodes.push(node);
            }
        }, {
            "Program:exit": () => {
                for (const node of _.difference(nodes, ignoreNodes))
                    context.report({
                        data: {
                            message: message ?? `This syntax is not allowed: ${selector}`
                        },
                        fix: () => typescript_misc_1.is.not.empty(replacement)
                            ? [
                                {
                                    range: node.range,
                                    text: typescript_misc_1.is.not.empty(search)
                                        ? context.getText(node).replace(
                                        // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
                                        new RegExp(search, "u"), replacement)
                                        : replacement
                                }
                            ]
                            : [],
                        messageId: MessageId.customMessage,
                        node
                    });
            }
        });
    }
});
//# sourceMappingURL=no-restricted-syntax.js.map