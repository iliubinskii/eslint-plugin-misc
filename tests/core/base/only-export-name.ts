import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["only-export-name"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "only-export-name",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      code: 'export * as x from "source"',
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidName,
          data: { expected: "PascalCase" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.PascalCase.ts",
      code: "export class C {}",
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidName,
          data: { expected: "PascalCase" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.ts",
      code: 'export { x } from "source";',
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidName,
          data: { expected: "camelCase" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.camelCase.ts",
      code: "export function f() {}",
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidName,
          data: { expected: "camelCase" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.ts",
      code: "export interface I {}",
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidName,
          data: { expected: "kebabCase" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.kebab-case.ts",
      code: "export namespace n {}",
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidName,
          data: { expected: "kebabCase" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "export type T = string;",
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidName,
          data: { expected: "file" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "export const x = 1;",
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidName,
          data: { expected: "file" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "subfolder/index.ts",
      code: "export const x = 1;",
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidName,
          data: { expected: "subfolder" }
        }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      code: 'export * as PascalCase from "source"'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.PascalCase.ts",
      code: "export class PascalCase {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.ts",
      code: 'export { camelCase } from "source";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.camelCase.ts",
      code: "export function camelCase() {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.ts",
      code: "export interface kebabCase {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.kebab-case.ts",
      code: "export namespace kebabCase {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "export type file = string;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "export const file = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export * from "source";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export * as y from "source";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export default 1;
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const x = 1;
        export { y };
      `
    }
  ]
);
