import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["object-format"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "object-format",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ maxLineLength: 27 }],
      code: `
        <template>
          <p :value="{
          x: 1
          }"></p>
          <p :value="{
          x: 12
          }"></p>
        </template>
      `,
      output: `
        <template>
          <p :value="{x: 1}"></p>
          <p :value="{
          x: 12
          }"></p>
        </template>
      `,
      errors: [{ line: 2, endLine: 4, messageId: MessageId.preferSingleLine }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ maxLineLength: 22 }],
      code: `
        const obj1 = {
        x: 1
        };
        const obj2 = {
        x: 12
        };
      `,
      output: `
        const obj1 = {x: 1};
        const obj2 = {
        x: 12
        };
      `,
      errors: [{ line: 1, endLine: 3, messageId: MessageId.preferSingleLine }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ maxLineLength: 25 }],
      code: `
        const obj1 = f({
        x: 1
        });
        const obj2 = f({
        x: 12
        });
      `,
      output: `
        const obj1 = f({x: 1});
        const obj2 = f({
        x: 12
        });
      `,
      errors: [{ line: 1, endLine: 3, messageId: MessageId.preferSingleLine }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ maxLineLength: 28 }],
      code: `
        const obj1 = {
        x: 1,
        y: 2
        };
        const obj2 = {
        x: 1,
        y: 23
        };
      `,
      output: `
        const obj1 = {x: 1,y: 2};
        const obj2 = {
        x: 1,
        y: 23
        };
      `,
      errors: [{ line: 1, endLine: 4, messageId: MessageId.preferSingleLine }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ maxObjectSize: 2 }],
      code: "const obj = {x: 1,y: 2,y: 3};",
      output: `
        const obj = {
        x: 1,
        y: 2,
        y: 3
        };
      `,
      errors: [{ line: 1, messageId: MessageId.preferMultiline }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ maxLineLength: 31 }],
      code: `
        const obj1 = {
        x: 1
        } as const;
        const obj2 = {
        x: 12
        } as const;
      `,
      output: `
        const obj1 = {x: 1} as const;
        const obj2 = {
        x: 12
        } as const;
      `,
      errors: [{ line: 1, endLine: 3, messageId: MessageId.preferSingleLine }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = { // Comment
        x: 1
        };
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        // Comment
        x: 1
        };
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        x: 1 // Comment
        };
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const obj = {
        x: 1, // Comment
        x: 2
        };
      `
    }
  ]
);
