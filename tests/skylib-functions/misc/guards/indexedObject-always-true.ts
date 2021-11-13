import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/indexedObject-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("indexedObject-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.indexedObject({});",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
