import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/map-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("map-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.map(1, is.string, is.string);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
