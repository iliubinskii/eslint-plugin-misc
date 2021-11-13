import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["prefer-only-export"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "prefer-only-export",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ selector: "ClassDeclaration > Identifier.id" }],
      code: `
        export class C {}
        export const x = 1;
      `,
      errors: [
        { line: 1, messageId: MessageId.invalidExport },
        { line: 2, messageId: MessageId.invalidExport }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ selector: "ClassDeclaration > Identifier.id" }],
      code: `
        export class C {}
        export enum E {}
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
      options: [{ selector: "ClassDeclaration > Identifier.id" }],
      code: "export class C {}"
    }
  ]
);
