/* eslint-disable misc/no-at-sign-internal-import -- Ok */

import { rules, utils } from "@";
import { EmptyLine } from "@/core/base/consistent-empty-lines";
import getCurrentLine from "get-current-line";

const rule = rules["consistent-empty-lines"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "consistent-empty-lines",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id1",
              emptyLine: EmptyLine.always,
              selector: "ImportDeclaration, TSExportAssignment"
            },
            {
              _id: "id2",
              emptyLine: EmptyLine.never,
              selector: "ImportDeclaration"
            }
          ]
        }
      ],
      code: `
        import x from "source1";

        import y from "source2";
        import z from "source3";
        // Comment
        export = 1;
      `,
      output: `
        import x from "source1";
        import y from "source2";
        import z from "source3";

        // Comment
        export = 1;
      `,
      errors: [
        { line: 3, messageId: MessageId.removeEmptyLine, data: { _id: "id2" } },
        { line: 6, messageId: MessageId.addEmptyLine, data: { _id: "id1" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id1",
              emptyLine: EmptyLine.always,
              next: "ImportDeclaration, TSExportAssignment",
              prev: "ImportDeclaration, TSExportAssignment"
            },
            {
              _id: "id2",
              emptyLine: EmptyLine.any,
              next: "ImportDeclaration",
              prev: "ImportDeclaration"
            }
          ]
        }
      ],
      code: `
        import x from "source1";

        import y from "source2";
        import z from "source3";
        // Comment
        export = 1;
      `,
      output: `
        import x from "source1";

        import y from "source2";
        import z from "source3";

        // Comment
        export = 1;
      `,
      errors: [
        { line: 6, messageId: MessageId.addEmptyLine, data: { _id: "id1" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id",
              emptyLine: EmptyLine.always,
              next: ":statement",
              prev: ":statement"
            }
          ]
        }
      ],
      code: `
        const x = 1;
        {
          const y = 2;
          const z = 3;
        }
      `,
      output: `
        const x = 1;

        {
          const y = 2;

          const z = 3;
        }
      `,
      errors: [
        {
          line: 2,
          endLine: 5,
          messageId: MessageId.addEmptyLine,
          data: { _id: "id" }
        },
        { line: 4, messageId: MessageId.addEmptyLine, data: { _id: "id" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id",
              emptyLine: EmptyLine.never,
              next: "ArrayExpression > .elements",
              prev: "ArrayExpression > .elements"
            }
          ]
        }
      ],
      code: `
        [
          {},

          {}
        ]
      `,
      output: `
        [
          {},
          {}
        ]
      `,
      errors: [
        { line: 4, messageId: MessageId.removeEmptyLine, data: { _id: "id" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id",
              emptyLine: EmptyLine.commented,
              selector: "ImportDeclaration"
            }
          ]
        }
      ],
      code: `
        import x1 from "source1";

        import x2 from "source2";
        // Comment
        import x3 from "source3";
        import x4 from "source4";

        import x5 from "source5";
      `,
      output: `
        import x1 from "source1";
        import x2 from "source2";

        // Comment
        import x3 from "source3";

        import x4 from "source4";
        import x5 from "source5";
      `,
      errors: [
        { line: 3, messageId: MessageId.removeEmptyLine, data: { _id: "id" } },
        { line: 5, messageId: MessageId.addEmptyLine, data: { _id: "id" } },
        { line: 6, messageId: MessageId.addEmptyLine, data: { _id: "id" } },
        { line: 8, messageId: MessageId.removeEmptyLine, data: { _id: "id" } }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id",
              emptyLine: EmptyLine.never,
              next: "ObjectExpression > .properties",
              prev: "ObjectExpression > .properties"
            }
          ]
        }
      ],
      code: "module.exports = { ...config, maxWorkers: 4 };"
    }
  ]
);
