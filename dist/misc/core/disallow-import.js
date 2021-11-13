"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disallowImport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const ruleTemplates = tslib_1.__importStar(require("../../rule-templates"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["disallowedSource"] = "disallowedSource";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.disallowImport = utils.createRule({
    name: "disallow-import",
    vue: true,
    isOptions: functions_1.is.object.factory({ allow: utils.isStringOrStrings, disallow: utils.isStringOrStrings }, {}),
    defaultOptions: { allow: [], disallow: [] },
    messages: {
        [MessageId.disallowedSource]: "Import from this source is not allowed"
    },
    docs: {
        description: "Disallows import given sources.",
        optionTypes: { allow: "string | string[]", disallow: "string | string[]" },
        optionDescriptions: {
            allow: "Allowed sources (minimatch)",
            disallow: "Disallowed sources (minimatch)"
        },
        failExamples: `
      /*
      eslint @skylib/disallow-import: [
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
      eslint @skylib/disallow-import: [
        error,
        {
          disallow: "source1"
        }
      ]
      */
      import * as source2 from "source2";
    `
    },
    create: context => {
        const matcher = utils.createFileMatcher(context.options, false, {
            dot: true
        });
        return ruleTemplates.source(ctx => {
            if (matcher(ctx.source))
                context.report({
                    messageId: MessageId.disallowedSource,
                    node: ctx.node
                });
        });
    }
});
//# sourceMappingURL=disallow-import.js.map