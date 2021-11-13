"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSelfImport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const ruleTemplates = tslib_1.__importStar(require("../../rule-templates"));
const utils = tslib_1.__importStar(require("../../utils"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    MessageId["noSelfImport"] = "noSelfImport";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noSelfImport = utils.createRule({
    name: "no-self-import",
    vue: true,
    messages: { [MessageId.noSelfImport]: "Self-import is not allowed" },
    docs: {
        description: "Disallows self-import.",
        failExamples: `
      // filename: file.ts
      import { a } from "./file";
      import { b } from "./file.ts";
    `,
        passExamples: `
      // filename: file.ts
      import { a } from "@/file";
      import { b } from "@/file.ts";
    `
    },
    create: context => {
        const basename = context.stripExtension(node_path_1.default.basename(context.filename));
        return ruleTemplates.source(ctx => {
            const { node, source } = ctx;
            if (node_path_1.default.dirname(source) === "." &&
                context.stripExtension(node_path_1.default.basename(source)) === basename)
                context.report({ messageId: MessageId.noSelfImport, node });
        });
    }
});
//# sourceMappingURL=no-self-import.js.map