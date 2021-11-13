import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/no-OwnProps-extends"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-OwnProps-extends", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "interface OwnProps extends I {}",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
