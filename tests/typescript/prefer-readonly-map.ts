import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/prefer-readonly-map"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-readonly-map", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "function f(x: Map<string, string>) {}",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
