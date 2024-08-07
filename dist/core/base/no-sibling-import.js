"use strict";
/* eslint-disable no-sync -- Ok */
/* eslint-disable security/detect-non-literal-fs-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSiblingImport = exports.isSuboptions = exports.isStringsArray = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const ruleTemplates = tslib_1.__importStar(require("../../rule-templates"));
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_misc_1 = require("typescript-misc");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    MessageId["disallowedSource"] = "disallowedSource";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.isStringsArray = typescript_misc_1.is.factory(typescript_misc_1.is.array.of, typescript_misc_1.is.strings);
exports.isSuboptions = typescript_misc_1.is.object.factory({ _id: typescript_misc_1.is.string, hierarchy: exports.isStringsArray }, {});
exports.noSiblingImport = utils.createRule({
    name: "no-sibling-import",
    isSuboptions: typescript_misc_1.is.object.factory({ _id: typescript_misc_1.is.string, hierarchy: exports.isStringsArray }, {}),
    defaultSuboptions: { hierarchy: [] },
    suboptionsKey: "rules",
    messages: {
        [MessageId.disallowedSource]: "Import from this source is not allowed"
    },
    docs: {
        description: "Restricts importing siblings.",
        suboptionTypes: { _id: "string", hierarchy: "string[][]" },
        suboptionDescriptions: {
            _id: "Id",
            hierarchy: "Allows some sibling dependencies"
        },
        failExamples: `
      // filename: file.ts
      import { x } from "./sibling-file";
    `,
        passExamples: `
      // filename: file.ts
      /*
      eslint misc/no-sibling-import: [
        error,
        {
          rules: [
            {
              hierarchy: [["./sibling-file"], ["./file"]]
            }
          ]
        }
      ]
      */
      import { x } from "./sibling-file";
      import { y } from "./folder";
    `
    },
    create: context => {
        const path = context.stripExtension(context.filename);
        const dir = node_path_1.default.dirname(path);
        const basename = node_path_1.default.basename(path);
        if (basename === "index" || basename.startsWith("index."))
            return {};
        const matcher = (0, typescript_misc_1.evaluate)(() => {
            const rules = context.options.rules.map((rule) => {
                const matchers = rule.hierarchy.map(pattern => utils.createFileMatcher(pattern, false, { dot: true }));
                const maxIndex = findLastIndex(`./${basename}`, matchers);
                return {
                    ...rule,
                    matcher: str => {
                        const index = findIndex(str, matchers);
                        return index !== -1 && maxIndex !== -1 && index < maxIndex;
                    }
                };
            });
            return (str) => rules.some(rule => rule.matcher(str));
        });
        return ruleTemplates.source(ctx => {
            const source = context.stripExtension(ctx.source);
            const parts = source.split("/");
            if (parts.length === 2) {
                const sourceDir = typescript_misc_1.a.first(parts);
                const sourceBasename = typescript_misc_1.a.second(parts);
                const sourcePath = `${dir}/${sourceBasename}`;
                if (sourceDir === ".")
                    if (matcher(source) || sourceBasename.startsWith(`${basename}.`)) {
                        // Valid
                    }
                    else if (node_fs_1.default.existsSync(sourcePath) &&
                        node_fs_1.default.statSync(sourcePath).isDirectory()) {
                        // Valid
                    }
                    else
                        context.report({
                            messageId: MessageId.disallowedSource,
                            node: ctx.node
                        });
            }
        });
    }
});
/**
 * Finds index.
 * @param str - String.
 * @param matchers - Matchers.
 * @returns Index.
 */
function findIndex(str, matchers) {
    return matchers.findIndex(matcher => matcher(str));
}
/**
 * Finds last index.
 * @param str - String.
 * @param matchers - Matchers.
 * @returns Index.
 */
function findLastIndex(str, matchers) {
    return typescript_misc_1.a.findLastIndex(matchers, matcher => matcher(str));
}
//# sourceMappingURL=no-sibling-import.js.map