import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["disallow-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule("disallow-import", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ allow: ["source1", "*/source1"], disallow: "**/source1" }],
    code: `
      import "source1";
      import "source2";
      import "a/source1";
      import "a/source2";
      import "a/b/source1";
      import "a/b/source2";
    `,
    errors: [{ line: 5, messageId: MessageId.disallowedSource }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ allow: "*/source1" }],
    code: `
      import "source1";
      import "source2";
      import "a/source1";
      import "a/source2";
      import "a/b/source1";
      import "a/b/source2";
    `,
    errors: [
      { line: 1, messageId: MessageId.disallowedSource },
      { line: 2, messageId: MessageId.disallowedSource },
      { line: 4, messageId: MessageId.disallowedSource },
      { line: 5, messageId: MessageId.disallowedSource },
      { line: 6, messageId: MessageId.disallowedSource }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }],
    code: `
      import "@/source";
      import "./source";
      import "../source";
      import "source";
    `,
    errors: [
      { line: 1, messageId: MessageId.disallowedSource },
      { line: 2, messageId: MessageId.disallowedSource },
      { line: 3, messageId: MessageId.disallowedSource }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }],
    code: `
      import("@/source");
      import("./source");
      import("../source");
      import("source");
    `,
    errors: [
      { line: 1, messageId: MessageId.disallowedSource },
      { line: 2, messageId: MessageId.disallowedSource },
      { line: 3, messageId: MessageId.disallowedSource }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }],
    code: `
      require("@/source");
      require("./source");
      require("../source");
      require("source");
    `,
    errors: [
      { line: 1, messageId: MessageId.disallowedSource },
      { line: 2, messageId: MessageId.disallowedSource },
      { line: 3, messageId: MessageId.disallowedSource }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }],
    code: `
      export * from "@/source";
      export * from "./source";
      export * from "../source";
      export * from "source";
    `,
    errors: [
      { line: 1, messageId: MessageId.disallowedSource },
      { line: 2, messageId: MessageId.disallowedSource },
      { line: 3, messageId: MessageId.disallowedSource }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ disallow: ["@/*", "./*", "../*"] }],
    code: `
      export { x1 } from "@/source";
      export { x2 } from "./source";
      export { x3 } from "../source";
      export { x4 } from "source";
    `,
    errors: [
      { line: 1, messageId: MessageId.disallowedSource },
      { line: 2, messageId: MessageId.disallowedSource },
      { line: 3, messageId: MessageId.disallowedSource }
    ]
  }
]);
