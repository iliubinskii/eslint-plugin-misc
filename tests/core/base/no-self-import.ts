import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-self-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-self-import", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      import "./file";
      import "./file.ts";
      import "./source";
      import "@/file";
      import "@/file.ts";
      import "@/source";
    `,
    errors: [
      { line: 1, messageId: MessageId.noSelfImport },
      { line: 2, messageId: MessageId.noSelfImport }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    filename: "kebab-case.kebab-case.ts",
    code: `
      import("./kebab-case.kebab-case");
      import("./kebab-case.kebab-case.ts");
      import("./file");
      import("@/kebab-case.kebab-case");
      import("@/kebab-case.kebab-case.ts");
      import("@/file");
    `,
    errors: [
      { line: 1, messageId: MessageId.noSelfImport },
      { line: 2, messageId: MessageId.noSelfImport }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    filename: "kebab-case.kebab-case.ts",
    code: `
      require("./kebab-case.kebab-case");
      require("./kebab-case.kebab-case.ts");
      require("./file");
      require("@/kebab-case.kebab-case");
      require("@/kebab-case.kebab-case.ts");
      require("@/file");
    `,
    errors: [
      { line: 1, messageId: MessageId.noSelfImport },
      { line: 2, messageId: MessageId.noSelfImport }
    ]
  }
]);
