import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/no-evaluate-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-evaluate-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "evaluate<T>();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
