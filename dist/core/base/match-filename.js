"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchFilename = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_misc_1 = require("typescript-misc");
var MessageId;
(function (MessageId) {
    MessageId["invalidText"] = "invalidText";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.matchFilename = utils.createRule({
    name: "match-filename",
    isOptions: typescript_misc_1.is.object.factory({ prefix: typescript_misc_1.is.string, selector: utils.isSelector, suffix: typescript_misc_1.is.string }, { format: utils.isCasing }),
    defaultOptions: { prefix: "", suffix: "" },
    messages: { [MessageId.invalidText]: "Should match file name: {{expected}}" },
    docs: {
        description: "Requires that AST element matches filename.",
        optionTypes: {
            format: '"camelCase" | "kebab-case" | "PascalCase"',
            prefix: "string",
            selector: "string | string[]",
            suffix: "string"
        },
        optionDescriptions: {
            format: "Format",
            prefix: "Prefix",
            selector: "AST selector",
            suffix: "Suffix"
        },
        failExamples: `
      /*
      eslint misc/match-filename: [
        error,
        {
          disallow: "source1"
        }
      ]
      */
      import * as source1 from "source1";
    `,
        passExamples: `
      /*
      eslint misc/match-filename: [
        error,
        {
          disallow: "source1"
        }
      ]
      */
      import * as source2 from "source2";
    `
    },
    create: (context) => {
        const { format, prefix, selector: mixedSelector, suffix } = context.options;
        const selector = utils.selector(mixedSelector);
        return {
            [selector]: (node) => {
                const got = utils.nodeText(node, "?");
                const expected = prefix + context.textFromPath(context.filename, got, format) + suffix;
                if (got === expected) {
                    // Valid
                }
                else
                    context.report({
                        data: { expected },
                        messageId: MessageId.invalidText,
                        node
                    });
            }
        };
    }
});
//# sourceMappingURL=match-filename.js.map