import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["require-syntax"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "require-syntax",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ selector: "Identifier[name=x]" }],
      code: "",
      errors: [
        {
          line: 1,
          messageId: MessageId.customMessage,
          data: { message: "Missing syntax: Identifier[name=x]" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ once: true, selector: "Identifier[name=x]" }],
      code: "",
      errors: [
        {
          line: 1,
          messageId: MessageId.customMessage,
          data: { message: "Missing syntax: Identifier[name=x]" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ message: "Sample message", selector: "Identifier[name=x]" }],
      code: "",
      errors: [
        {
          line: 1,
          messageId: MessageId.customMessage,
          data: { message: "Sample message" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          message: "Sample message",
          once: true,
          selector: "Identifier[name=x]"
        }
      ],
      code: "",
      errors: [
        {
          line: 1,
          messageId: MessageId.customMessage,
          data: { message: "Sample message" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ once: true, selector: "Identifier[name=x]" }],
      code: `
        const x = 1;
        const x = 1;
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.customMessage,
          data: { message: "Require syntax once: Identifier[name=x]" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          message: "Sample message",
          once: true,
          selector: "Identifier[name=x]"
        }
      ],
      code: `
        const x = 1;
        const x = 1;
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.customMessage,
          data: { message: "Sample message" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          message: "Sample message",
          selector: "Identifier[name=z]",
          trigger: "Identifier[name=y]"
        }
      ],
      code: `
        const x = 1;
        const y = 1;
      `,
      errors: [
        {
          line: 2,
          messageId: MessageId.customMessage,
          data: { message: "Sample message" }
        }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ selector: "Identifier[name=x]" }],
      code: "const x = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        { selector: "Identifier[name=x]", trigger: "Identifier[name=y]" }
      ],
      code: "const z = 1;"
    }
  ]
);
