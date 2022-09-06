import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/program-flow/prefer-clearTimeout"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-clearTimeout", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "clearTimeout();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
