import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";

export enum MessageId {
  invalidExport = "invalidExport"
}

export const exportMatchingFilenameOnly = utils.createRule({
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
  create: context =>
    utils.mergeListeners(
      ruleTemplates.export(ctx => {
        const { identifiers, onlyExport } = ctx;

        const hasExportMatchingFilename = identifiers.some(
          node =>
            node.name ===
            context.identifierFromPath(context.filename, node.name)
        );

        if (hasExportMatchingFilename && !onlyExport)
          for (const node of identifiers)
            context.report({ messageId: MessageId.invalidExport, node });
      })
    )
});
