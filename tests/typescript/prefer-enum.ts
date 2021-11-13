import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/prefer-enum"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-enum", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type T =
        | "a"
        | "b";
    `,
    errors: [{ line: 1, endLine: 3, messageId: MessageId.customMessage }]
  }
]);
