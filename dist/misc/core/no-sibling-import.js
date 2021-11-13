"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSiblingImport = exports.isSuboptions = exports.isStringsArray = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const ruleTemplates = tslib_1.__importStar(require("../../rule-templates"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    MessageId["disallowedSource"] = "disallowedSource";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.isStringsArray = functions_1.is.factory(functions_1.is.array.of, functions_1.is.strings);
exports.isSuboptions = functions_1.is.object.factory({ hierarchy: exports.isStringsArray }, {});
exports.noSiblingImport = utils.createRule({
    name: "no-sibling-import",
    vue: true,
    isSuboptions: functions_1.is.object.factory({ hierarchy: exports.isStringsArray }, {}),
    defaultSuboptions: { hierarchy: [] },
    suboptionsKey: "rules",
    messages: {
        [MessageId.disallowedSource]: "Import from this source is not allowed"
    },
    docs: {
        description: "Restricts importing siblings.",
        suboptionTypes: { hierarchy: "string[][]" },
        suboptionDescriptions: { hierarchy: "Allows some sibling dependencies" },
        failExamples: `
      // filename: file.ts
      import { x } from "./sibling-file";
    `,
        passExamples: `
      // filename: file.ts
      /*
      eslint @skylib/no-sibling-import: [
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
        const matcher = (0, functions_1.evaluate)(() => {
            const rules = context.options.rules.map((rule) => {
                const matchers = rule.hierarchy.map(pattern => utils.createFileMatcher(pattern, false, { dot: true }));
                const maxIndex = findLastIndex(`./${basename}`, matchers);
                return Object.assign(Object.assign({}, rule), { matcher: str => {
                        const index = findLastIndex(str, matchers);
                        return index !== -1 && maxIndex !== -1 && index <= maxIndex;
                    } });
            });
            return (str) => rules.some(rule => rule.matcher(str));
        });
        return ruleTemplates.source(ctx => {
            const source = context.stripExtension(ctx.source);
            const parts = source.split("/");
            if (parts.length === 2) {
                const sourceDir = functions_1.a.first(parts);
                const sourceBasename = functions_1.a.second(parts);
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
 *
 * @param str - String.
 * @param matchers - Matchers.
 * @returns Index.
 */
function findLastIndex(str, matchers) {
    return findLastIndex2(matchers, matcher => matcher(str));
}
/**
 * Finds last index.
 *
 * @param arr - Array.
 * @param callback - Callback.
 * @returns Last matching index.
 */
// eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
// fixme
function findLastIndex2(arr, callback) {
    const index = functions_1.a.reverse(arr).findIndex(callback);
    return index === -1 ? -1 : arr.length - index - 1;
}
//# sourceMappingURL=no-sibling-import.js.map