import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/prefer-readonly-array"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-readonly-array", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f1(x: string[]) {}
      function f2(x: [string]) {}
      function f3(x: Array<string>) {}
      function f4(x: readonly string[]) {}
      function f5(x: readonly [string]) {}
      function f6(x: ReadonlyArray<string>) {}
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);
