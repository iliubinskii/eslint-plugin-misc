import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/array/mixedFrom-include-non-array"];

const MessageId = utils.getMessageId(rule);

utils.testRule("mixedFrom-include-non-array", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "a.fromMixed([]);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
