import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/array/prefer-clone"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-clone", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "const x = [...arr];",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
