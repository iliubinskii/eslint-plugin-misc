import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/prefer-ReadonlySet"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-ReadonlySet", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "function f(x: Set<string>) {}",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
