import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/prefer-ReadonlyMap"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-ReadonlyMap", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "function f(x: Map<string, string>) {}",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
