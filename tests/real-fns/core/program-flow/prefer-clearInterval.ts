import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/program-flow/prefer-clearInterval"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-clearInterval", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "clearInterval();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
