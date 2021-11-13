"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentFilename = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    MessageId["invalidFilename"] = "invalidFilename";
    MessageId["invalidFilenameId"] = "invalidFilenameId";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.consistentFilename = utils.createRule({
    name: "consistent-filename",
    vue: true,
    isOptions: functions_1.is.object.factory({ format: utils.isCasing }, {}),
    defaultOptions: { format: utils.Casing.kebabCase },
    isSuboptions: functions_1.is.object.factory({ _id: functions_1.is.string, match: functions_1.is.boolean, selector: utils.isSelector }, { format: utils.isCasing }),
    defaultSuboptions: { match: false },
    suboptionsKey: "overrides",
    messages: {
        [MessageId.invalidFilename]: "Expecting file name to be: {{expected}}",
        [MessageId.invalidFilenameId]: "Expecting file name to be: {{expected}} ({{_id}})"
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
            selector: "Triggers override when AST element matching AST selector is found"
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
    create: (context) => {
        const items = [];
        return utils.mergeListeners(...context.options.overrides.map((suboptions) => {
            const selector = utils.selector(suboptions.selector);
            return {
                [selector]: (node) => {
                    items.push({ node, suboptions });
                }
            };
        }), {
            "Program:exit": () => {
                const { base: got } = node_path_1.default.parse(context.filename);
                if (items.length) {
                    const item = functions_1.a.last(items);
                    const { _id, format, match } = Object.assign({ format: context.options.format }, item.suboptions);
                    const expected = getExpected(got, format, match, item.node);
                    if (got === expected) {
                        // Valid
                    }
                    else
                        context.report({
                            data: { _id, expected },
                            loc: context.locZero,
                            messageId: MessageId.invalidFilenameId
                        });
                }
                else {
                    const expected = getExpected(got, context.options.format);
                    if (got === expected) {
                        // Valid
                    }
                    else
                        context.report({
                            data: { expected },
                            loc: context.locZero,
                            messageId: MessageId.invalidFilename
                        });
                }
            }
        });
        function getExpected(got, format, match = false, node) {
            return got
                .split(".")
                .map((part, index) => index === 0
                ? utils.setCasing(match ? utils.nodeText(functions_1.as.not.empty(node), part) : part, format)
                : _.kebabCase(part))
                .join(".");
        }
    }
});
//# sourceMappingURL=consistent-filename.js.map