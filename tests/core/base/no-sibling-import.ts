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
      code: 'import * as source from "./source";',
      errors: [{ line: 1, messageId: MessageId.disallowedSource }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ hierarchy: [["./*"], ["./source"]] }] }],
      code: 'import * as source from "./source";',
      errors: [{ line: 1, messageId: MessageId.disallowedSource }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ hierarchy: [["./*"]] }] }],
      code: 'import * as source from "./source";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ hierarchy: [["./source"], ["./file"]] }] }],
      code: 'import * as source from "./source";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "subfolder/index.ts",
      code: 'import * as source from "./source";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: 'import * as internal from "./file.internal";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ hierarchy: [["./source"], ["./file"]] }] }],
      code: `
        import * as source from "./source";
        import * as parentSource from "../parent-source";
        import * as subfolder from "./subfolder";
        require("node:fs");
      `
    }
  ]
);
