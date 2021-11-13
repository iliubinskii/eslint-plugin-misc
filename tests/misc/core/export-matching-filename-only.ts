import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["export-matching-filename-only"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "export-matching-filename-only",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const file = 1;
        export * from "source";
      `,
      errors: [{ line: 1, messageId: MessageId.invalidExport }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const file = 1;
        export * as y from "source";
      `,
      errors: [
        { line: 1, messageId: MessageId.invalidExport },
        { line: 2, messageId: MessageId.invalidExport }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const file = 1;
        export default 1;
      `,
      errors: [{ line: 1, messageId: MessageId.invalidExport }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const file = 1;
        export const y = 1;
      `,
      errors: [
        { line: 1, messageId: MessageId.invalidExport },
        { line: 2, messageId: MessageId.invalidExport }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "export const file = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export * from "source";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export * as y from "source";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export default 1;
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export const y = 1;
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class file {}
        export namespace file {}
      `
    }
  ]
);
