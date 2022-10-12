import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-sibling-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-sibling-import",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        import a from "./source";
        import e from "./subfolder";
        import b from "./file.internal";
        import d from "../source";
        require("node:fs");
      `,
      errors: [{ line: 1, messageId: MessageId.disallowedSource }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            { _id: "id1", hierarchy: [["./source1"], ["./file"]] },
            { _id: "id2", hierarchy: [["./source2"], ["./another-file"]] }
          ]
        }
      ],
      code: `
        import x from "./source1";
        import y from "./source2";
      `,
      errors: [{ line: 2, messageId: MessageId.disallowedSource }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ _id: "id", hierarchy: [["./*"], ["./*"]] }] }],
      code: 'import x from "./source";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "subfolder/index.ts",
      code: 'import x from "./source";'
    }
  ]
);
