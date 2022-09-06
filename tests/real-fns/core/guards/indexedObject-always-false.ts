import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/indexedObject-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("indexedObject-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.indexedObject(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
