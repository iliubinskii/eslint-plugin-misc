import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["sort-keys"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "sort-keys",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const x = {
          [key]: 6,
          e: 5,
          d(): string {},
          ["f" as string]: 4,
          ...{},
          c,
          "a": 3,
          B: 2,
          [/.*/u.source]: 1
        }
      `,
      output: `
        const x = {
          ["f" as string]: 4,
          d(): string {},
          e: 5,
          [key]: 6,
          ...{},
          [/.*/u.source]: 1,
          B: 2,
          "a": 3,
          c
        }
      `,
      errors: [
        { line: 2, endLine: 5, messageId: MessageId.incorrectSortingOrder },
        { line: 7, endLine: 10, messageId: MessageId.incorrectSortingOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ overrides: [{ _id: "id", selector: "Identifier" }] }],
      code: "const id = 1;",
      errors: [
        { line: 1, messageId: MessageId.expectingObject, data: { _id: "id" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export default {
          b: 2,
          a: 1
        }
      `,
      output: `
        export default {
          a: 1,
          b: 2
        }
      `,
      errors: [
        { line: 2, endLine: 3, messageId: MessageId.incorrectSortingOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export default {
          a: 1,
          c: 3,
          b: 2,
          d: 4
        }
      `,
      output: `
        export default {
          a: 1,
          b: 2,
          c: 3,
          d: 4
        }
      `,
      errors: [
        { line: 3, endLine: 4, messageId: MessageId.incorrectSortingOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          overrides: [
            {
              _id: "id",
              customOrder: ["a", "d"],
              selector: "VariableDeclarator[id.name=y] > ObjectExpression"
            }
          ]
        }
      ],
      code: `
        const x = {
          a: 1,
          c: 3,
          b: 2,
          d: 4
        };
        const y = {
          a: 1,
          c: 3,
          b: 2,
          d: 4
        };
      `,
      output: `
        const x = {
          a: 1,
          b: 2,
          c: 3,
          d: 4
        };
        const y = {
          a: 1,
          d: 4,
          b: 2,
          c: 3
        };
      `,
      errors: [
        { line: 3, endLine: 4, messageId: MessageId.incorrectSortingOrder },
        {
          line: 9,
          endLine: 11,
          messageId: MessageId.incorrectSortingOrderId,
          data: { _id: "id" }
        }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "module.exports = { ...config, maxWorkers: 4 };"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "const x = { ...{ a }, a: 1, b: 2 };"
    }
  ]
);
