import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/no-computed-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-computed-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "computed<T>();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
