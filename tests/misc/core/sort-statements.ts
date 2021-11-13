import { rules, utils } from "@";
// eslint-disable-next-line @skylib/no-at-sign-internal-import, @skylib/no-internal-modules -- Ok
import { StatementType } from "@/misc/core/sort-statements";
import getCurrentLine from "get-current-line";

const rule = rules["sort-statements"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "sort-statements",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        import "source2";
        function f4();
        function f3() {}
        type T4 = 1;
        interface T3 {}
        const x1 = 1;
        const x2 = 2;
        namespace N1 {}
        export const x3 = 3;
        export const x4 = 4;
        export namespace N2 {}
        export default 1;
        export function f2();
        export function f1() {}
        export type T2 = 1;
        export interface T1 {}
        export { e } from "source2";
        export type { E } from "source2";
        export { d } from "source1";
        export type { D } from "source1";
        export { A, B, C };
        export * as source2 from "source2";
        export * from "source1";
        declare global {}
        import "source1";
      `,
      output: `
        import "source2";
        import "source1";
        declare global {}
        export * from "source1";
        export * as source2 from "source2";
        export { A, B, C };
        export type { D } from "source1";
        export { d } from "source1";
        export type { E } from "source2";
        export { e } from "source2";
        export default 1;
        export const x3 = 3;
        export const x4 = 4;
        export namespace N2 {}
        export interface T1 {}
        export type T2 = 1;
        export function f1() {}
        export function f2();
        const x1 = 1;
        const x2 = 2;
        namespace N1 {}
        interface T3 {}
        type T4 = 1;
        function f3() {}
        function f4();
      `,
      errors: [
        { line: 2, endLine: 25, messageId: MessageId.incorrectSortingOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          programOrder: [
            StatementType.ImportDeclaration,
            StatementType.FunctionDeclaration,
            StatementType.TypeDeclaration,
            StatementType.Unknown
          ]
        }
      ],
      code: `
        import "source";
        const x = 1;
        type T = 1;
        function f() {}
      `,
      output: `
        import "source";
        function f() {}
        type T = 1;
        const x = 1;
      `,
      errors: [
        { line: 2, endLine: 4, messageId: MessageId.incorrectSortingOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          blockOrder: [
            StatementType.ImportDeclaration,
            StatementType.FunctionDeclaration,
            StatementType.TypeDeclaration,
            StatementType.Unknown
          ]
        }
      ],
      code: `
        function f() {
          function g() {}
          const x = 1;
          type T = 1;
          function h() {}
        }
      `,
      output: `
        function f() {
          function g() {}
          function h() {}
          type T = 1;
          const x = 1;
        }
      `,
      errors: [
        { line: 3, endLine: 5, messageId: MessageId.incorrectSortingOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          moduleOrder: [
            StatementType.ImportDeclaration,
            StatementType.FunctionDeclaration,
            StatementType.TypeDeclaration,
            StatementType.Unknown
          ]
        }
      ],
      code: `
        namespace NS {
          function f() {}
          const x = 1;
          type T = 1;
          function g() {}
        }
      `,
      output: `
        namespace NS {
          function f() {}
          function g() {}
          type T = 1;
          const x = 1;
        }
      `,
      errors: [
        { line: 3, endLine: 5, messageId: MessageId.incorrectSortingOrder }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        import "source2";
        test("test7", () => {});
        test.skip.each([])("test6", () => {});
        test.skip("test5", () => {});
        test.only.each([])("test4", () => {});
        test.only("test3", () => {});
        test.each([])("test2", () => {});
        test("test1", () => {});
        console.log(1);
        import "source1";
      `,
      output: `
        import "source2";
        import "source1";
        console.log(1);
        test("test1", () => {});
        test.each([])("test2", () => {});
        test.only("test3", () => {});
        test.only.each([])("test4", () => {});
        test.skip("test5", () => {});
        test.skip.each([])("test6", () => {});
        test("test7", () => {});
      `,
      errors: [
        { line: 2, endLine: 10, messageId: MessageId.incorrectSortingOrder }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        test("Name1: subname", () => {});
        test("Name1, Name2", () => {});
        test("Name1.subname: subname", () => {});
      `
    }
  ]
);
