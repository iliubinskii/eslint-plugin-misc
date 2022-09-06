import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/reflect/prefer-reflect"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-reflect", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Reflect.get();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
