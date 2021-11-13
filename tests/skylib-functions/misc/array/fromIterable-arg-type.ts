import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/array/fromIterable-arg-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule("fromIterable-arg-type", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "a.fromIterable([]);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
