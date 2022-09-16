import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/prefer-enum"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-enum", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f(x: E) {
        x === "a";
        x !== "a";
        "a" === x;
        "a" !== x;
      }

      function g(x: E) {
        x === E.a;
        x !== E.a;
        E.a === x;
        E.a !== x;
      }

      function h(x: T) {
        x === "a";
        x !== "a";
        "a" === x;
        "a" !== x;
      }

      enum E {
        a = "a",
        b = "b"
      }

      type T = "a" | 2;
    `,
    errors: [
      { line: 2, messageId: MessageId.preferEnumToStringLiteral },
      { line: 3, messageId: MessageId.preferEnumToStringLiteral },
      { line: 4, messageId: MessageId.preferEnumToStringLiteral },
      { line: 5, messageId: MessageId.preferEnumToStringLiteral }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f(): E {
        return "a";
      }

      function g(): E {
        return E.a;
      }

      function h(): T {
        return "a";
      }

      enum E {
        a = "a",
        b = "b"
      }

      type T = "a" | 2;
    `,
    errors: [{ line: 2, messageId: MessageId.preferEnumToStringLiteral }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type T1 =
        | "a"
        | "b";

      type T2 =
        | "a"
        | 2;
    `,
    errors: [{ line: 1, messageId: MessageId.preferEnumToStringUnionType }]
  }
]);
