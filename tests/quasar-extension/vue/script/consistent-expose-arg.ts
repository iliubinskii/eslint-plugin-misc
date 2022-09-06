import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/script/consistent-expose-arg"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-expose-arg", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "expose({});",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
