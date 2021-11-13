"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportMatchingFilenameOnly = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const ruleTemplates = tslib_1.__importStar(require("../../rule-templates"));
const utils = tslib_1.__importStar(require("../../utils"));
var MessageId;
(function (MessageId) {
    MessageId["invalidExport"] = "invalidExport";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.exportMatchingFilenameOnly = utils.createRule({
    name: "export-matching-filename-only",
    vue: true,
    messages: { [MessageId.invalidExport]: "Expecting only export" },
    docs: {
        description: "Requires that export matching filename is the only export.",
        failExamples: `
      // filename: file.ts
      export const file = 1;
      export const x = 1;
    `,
        passExamples: `
      // filename: file.ts
      export const file = 1;
    `
    },
    create: context => utils.mergeListeners(ruleTemplates.export(ctx => {
        const { identifiers, onlyExport } = ctx;
        const hasExportMatchingFilename = identifiers.some(node => node.name ===
            context.identifierFromPath(context.filename, node.name));
        if (hasExportMatchingFilename && !onlyExport)
            for (const node of identifiers)
                context.report({ messageId: MessageId.invalidExport, node });
    }))
});
//# sourceMappingURL=export-matching-filename-only.js.map