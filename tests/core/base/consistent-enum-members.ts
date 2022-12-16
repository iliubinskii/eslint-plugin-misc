import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["consistent-enum-members"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "consistent-enum-members",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          overrides: [
            {
              _id: "id",
              format: utils.Casing.camelCase,
              selector: "TSEnumDeclaration[id.name=F] > TSEnumMember"
            }
          ]
        }
      ],
      code: `
        enum E { CamelCase = "camelCase" }
        enum F { CamelCase = "camelCase" }
      `,
      errors: [{ line: 1, messageId: MessageId.inconsistentMember }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          overrides: [
            {
              _id: "id",
              format: utils.Casing.kebabCase,
              selector: "TSEnumDeclaration[id.name=F] > TSEnumMember"
            }
          ]
        }
      ],
      code: `
        enum E { kebabCase = "kebab-case" }
        enum F { kebabCase = "kebab-case" }
      `,
      errors: [{ line: 1, messageId: MessageId.inconsistentMember }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          overrides: [
            {
              _id: "id",
              format: utils.Casing.pascalCase,
              selector: "TSEnumDeclaration[id.name=F] > TSEnumMember"
            }
          ]
        }
      ],
      code: `
        enum E { pascalCase = "PascalCase" }
        enum F { pascalCase = "PascalCase" }
      `,
      errors: [{ line: 1, messageId: MessageId.inconsistentMember }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          overrides: [
            {
              _id: "id",
              format: utils.Casing.camelCase,
              selector: "TSEnumDeclaration[id.name=E] > TSEnumMember"
            },
            {
              _id: "id",
              format: utils.Casing.kebabCase,
              selector: "TSEnumDeclaration[id.name=F] > TSEnumMember"
            },
            {
              _id: "id",
              format: utils.Casing.pascalCase,
              selector: "TSEnumDeclaration[id.name=G] > TSEnumMember"
            }
          ]
        }
      ],
      code: `
        enum E { CamelCase = "camelCase" }
        enum F { kebabCase = "kebab-case" }
        enum G { pascalCase = "PascalCase" }
      `
    }
  ]
);
