import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/tuple-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("tuple-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.tuple(1, is.string, is.number);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
