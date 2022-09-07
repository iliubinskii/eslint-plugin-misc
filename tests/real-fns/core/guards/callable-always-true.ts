import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["real-fns/guards/callable-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("callable-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.callable(() => {});",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
