import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-at-sign-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-at-sign-import", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      import x from "@";
      import y from "@/folder";
    `,
    errors: [{ line: 1, messageId: MessageId.disallowedSource }]
  }
]);
