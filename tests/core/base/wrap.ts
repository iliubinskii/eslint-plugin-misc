import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules.wrap;

const MessageId = utils.getMessageId(rule);

utils.testRule("wrap", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      { plugin: "@typescript-eslint/eslint-plugin", rule: "no-shadow" }
    ],
    code: `
      const value = 1;
      enum E { value = "value" }
      enum F { value = "value" }
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: {
          message:
            "'value' is already declared in the upper scope on line 1 column 7."
        }
      },
      {
        line: 3,
        messageId: MessageId.customMessage,
        data: {
          message:
            "'value' is already declared in the upper scope on line 1 column 7."
        }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        lint: "TSEnumDeclaration[id.name=E] *",
        plugin: "@typescript-eslint/eslint-plugin",
        rule: "no-shadow"
      }
    ],
    code: `
      const value = 1;
      enum E { value = "value" }
      enum F { value = "value" }
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: {
          message:
            "'value' is already declared in the upper scope on line 1 column 7."
        }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        plugin: "@typescript-eslint/eslint-plugin",
        rule: "no-shadow",
        skip: "TSEnumDeclaration[id.name=F] *"
      }
    ],
    code: `
      const value = 1;
      enum E { value = "value" }
      enum F { value = "value" }
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: {
          message:
            "'value' is already declared in the upper scope on line 1 column 7."
        }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        disableFix: true,
        plugin: "eslint-plugin-sort-exports",
        rule: "sort-exports"
      }
    ],
    code: "export { b, a };",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Expected a before b" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ plugin: "eslint", rule: "no-param-reassign" }],
    code: `
      function f(x) {
        x++;
      }
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: { message: "Assignment to function parameter 'x'." }
      }
    ]
  }
]);
