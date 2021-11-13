import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-inferrable-types"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-inferrable-types", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f<T>() { const result: T = {} as T; }
      function g<T>() { const result = {} as T; }
      function h<T extends object>() { const result: object = {} as T; }
    `,
    errors: [{ line: 1, messageId: MessageId.triviallyInferrableType }]
  }
]);
