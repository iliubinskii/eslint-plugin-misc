import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/prefer-defineFn"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-defineFn", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "export const x = o.assign(() => {}, {});",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
