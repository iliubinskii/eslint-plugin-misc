import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["match-filename"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "match-filename",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "subfolder/index.ts",
      options: [{ format: utils.Casing.camelCase, selector: "Identifier" }],
      code: `
        export const x = 1;
        export const subfolder = 2;
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidText,
          data: { expected: "subfolder" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.ts",
      options: [{ format: utils.Casing.pascalCase, selector: "Identifier" }],
      code: `
        export class ClassName {}
        export class KebabCase {}
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidText,
          data: { expected: "KebabCase" }
        }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-PascalCase.ts",
      options: [{ selector: "Literal" }],
      code: 'const x = "kebab-PascalCase";'
    }
  ]
);
