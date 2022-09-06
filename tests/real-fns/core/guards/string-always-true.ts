import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/string-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("string-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'is.string("");',
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
