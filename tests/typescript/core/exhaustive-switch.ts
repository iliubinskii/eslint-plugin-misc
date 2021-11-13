import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/exhaustive-switch"];

const MessageId = utils.getMessageId(rule);

utils.testRule("exhaustive-switch", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const symbol = Symbol("test-symbol");

      function f01(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          case "a":
          case symbol:
        }
      }

      function f02(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          case 1:
          case symbol:
        }
      }

      function f03(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          case 1:
          case "a":
        }
      }

      function f04(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          case 1:
          case "a":
          case symbol:
        }
      }

      function f05(x: 1 | "a" | typeof symbol): void {
        switch (x) {
          default:
        }
      }
    `,
    errors: [
      { line: 4, messageId: MessageId.inexhaustiveSwitch },
      { line: 11, messageId: MessageId.inexhaustiveSwitch },
      { line: 18, messageId: MessageId.inexhaustiveSwitch }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const symbol = Symbol("test-symbol");

      function f01(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f02(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f03(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f04(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f05(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f06(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "symbol":
          case "undefined":
        }
      }

      function f07(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "undefined":
        }
      }

      function f08(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
        }
      }

      function f09(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f10(x: typeof symbol | "a" | 1 | 1n | true | (() => void) | null | undefined): void {
        switch (typeof x) {
          default:
        }
      }
    `,
    errors: [
      { line: 4, messageId: MessageId.inexhaustiveSwitch },
      { line: 16, messageId: MessageId.inexhaustiveSwitch },
      { line: 28, messageId: MessageId.inexhaustiveSwitch },
      { line: 40, messageId: MessageId.inexhaustiveSwitch },
      { line: 52, messageId: MessageId.inexhaustiveSwitch },
      { line: 64, messageId: MessageId.inexhaustiveSwitch },
      { line: 76, messageId: MessageId.inexhaustiveSwitch },
      { line: 88, messageId: MessageId.inexhaustiveSwitch }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const symbol = Symbol("test-symbol");

      function f01(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f02(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          case "bigint":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f03(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f04(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f05(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f06(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "symbol":
          case "undefined":
        }
      }

      function f07(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "undefined":
        }
      }

      function f08(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
        }
      }

      function f09(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          case "bigint":
          case "boolean":
          case "function":
          case "number":
          case "object":
          case "string":
          case "symbol":
          case "undefined":
        }
      }

      function f10(x: bigint | boolean | number | string | symbol | (new () => object) | {} | void): void {
        switch (typeof x) {
          default:
        }
      }
    `,
    errors: [
      { line: 4, messageId: MessageId.inexhaustiveSwitch },
      { line: 16, messageId: MessageId.inexhaustiveSwitch },
      { line: 28, messageId: MessageId.inexhaustiveSwitch },
      { line: 40, messageId: MessageId.inexhaustiveSwitch },
      { line: 52, messageId: MessageId.inexhaustiveSwitch },
      { line: 64, messageId: MessageId.inexhaustiveSwitch },
      { line: 76, messageId: MessageId.inexhaustiveSwitch },
      { line: 88, messageId: MessageId.inexhaustiveSwitch }
    ]
  }
]);
