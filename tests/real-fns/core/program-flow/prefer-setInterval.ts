import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["real-fns/program-flow/prefer-setInterval"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-setInterval", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "setInterval();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
