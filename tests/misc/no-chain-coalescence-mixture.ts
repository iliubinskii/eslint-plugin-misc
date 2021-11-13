import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-chain-coalescence-mixture"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-chain-coalescence-mixture", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "x?.y ?? z;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
