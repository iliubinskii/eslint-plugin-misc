import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/types/prefer-undefined-shorthand-typeName"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-undefined-shorthand-typeName", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = NumStr | undefined;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
