import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/prefer-array-type-alias"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-array-type-alias", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f01(x: string[]) {}
      function f02(x: [string]) {}
      function f03(x: Array<string>) {}
      function f04(x: readonly string[]) {}
      function f05(x: readonly [string]) {}
      function f06(x: ReadonlyArray<string>) {}
      function f07(x: any[]) {}
      function f08(x: [any]) {}
      function f09(x: Array<any>) {}
      function f10(x: readonly any[]) {}
      function f11(x: readonly [any]) {}
      function f12(x: ReadonlyArray<any>) {}
      function f13<T>(x: T[]) {}
      function f14<T>(x: [T]) {}
      type T1 = string[];
      type T2 = [string];
      type T3 = Array<readonly [string, string]>;
      type T4 = readonly string[];
      type T5 = readonly [string];
      type T6 = ReadonlyArray<readonly [string, string]>;
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage },
      { line: 5, messageId: MessageId.customMessage },
      { line: 6, messageId: MessageId.customMessage }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type T1<T extends string[]> = T;
      type T2<T = string[]> = T;
      type T3<T = []> = T;
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage }
    ]
  }
]);
