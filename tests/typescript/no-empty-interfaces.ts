import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-empty-interfaces"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-empty-interfaces", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {}
      interface J { x: string; }
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
