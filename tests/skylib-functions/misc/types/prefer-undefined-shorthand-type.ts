import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/types/prefer-undefined-shorthand-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-undefined-shorthand-type", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = boolean | undefined;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
