import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";

export enum MessageId {
  invalidName = "invalidName"
}

export const onlyExportName = utils.createRule({
  name: "only-export-name",
  vue: true,
  messages: {
    [MessageId.invalidName]: "Only export should match file name: {{expected}}"
  },
  docs: {
    description: "Requires that only export matches filename.",
    failExamples: `
      // filename: file.ts
      export class SampleClass {}
    `,
    passExamples: `
      // filename: SampleClass.ts
      export class SampleClass {}
    `
  },
  create: context =>
    ruleTemplates.export(ctx => {
      if (ctx.onlyExport)
        for (const node of ctx.identifiers) {
          const expected = context.identifierFromPath(
            context.filename,
            node.name
          );

          if ([expected, "default"].includes(node.name)) {
            // Valid
          } else
            context.report({
              data: { expected },
              messageId: MessageId.invalidName,
              node
            });
        }
    })
});
