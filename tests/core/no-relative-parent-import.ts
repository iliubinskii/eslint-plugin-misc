import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-relative-parent-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-relative-parent-import", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ allow: ["../allowed-source"] }],
    code: `
      import x1 from "..";
      import x2 from "../source";
      import x5 from "../allowed-source";
      import x3 from "../..";
      import x4 from "../../source";
      import x6 from "../../allowed-source";
    `,
    errors: [
      { line: 1, messageId: MessageId.disallowedSource },
      { line: 2, messageId: MessageId.disallowedSource },
      { line: 4, messageId: MessageId.disallowedSource },
      { line: 5, messageId: MessageId.disallowedSource },
      { line: 6, messageId: MessageId.disallowedSource }
    ]
  }
]);
