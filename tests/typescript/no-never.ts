import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-never"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-never", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f(value: "a" & "b") {}
      function g(value: "a" | "b") {}
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
