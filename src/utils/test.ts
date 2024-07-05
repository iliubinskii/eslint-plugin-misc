/* eslint-disable unicorn/prefer-module -- Ok */

import type {
  InvalidTestCase as BaseInvalidTestCase,
  TestCaseError as BaseTestCaseError,
  ValidTestCase as BaseValidTestCase,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { Rec, unknowns } from "typescript-misc";
import { o, s } from "typescript-misc";
import { TSESLint } from "@typescript-eslint/utils";
import { projectRoot } from "./misc";

/**
 * Extracts MessageId from rule.
 * @param rule - Rule.
 * @returns MessageId.
 */
export function getMessageId<T extends string>(
  rule: RuleModule<T, unknowns>
): Rec<T, T> {
  return o.fromEntries.exhaustive(
    o.keys(rule.meta.messages).map(key => [key, key])
  );
}

/**
 * Runs test.
 * @param name - Name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
export function testRule<
  K extends string,
  M extends string,
  O extends unknowns
>(
  name: K,
  rule: RuleModule<M, O>,
  invalid: InvalidTestCases<M, O>,
  valid: ValidTestCases<O> = []
): void {
  const tester = new TSESLint.RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2020,
      project: "./tsconfig.json",
      sourceType: "module",
      tsconfigRootDir: `${projectRoot}fixtures`
    }
  });

  tester.run(name, rule, {
    invalid: invalid.map((test): BaseInvalidTestCase<M, O> => {
      return {
        ...test,
        code: s.unpadMultiline(test.code),
        errors: test.errors.map((error): TestCaseError<M> => {
          return { endLine: error.line, ...error };
        }),
        filename: `${projectRoot}fixtures/${test.filename ?? "file.ts"}`,
        output: s.unpadMultiline(test.output ?? test.code)
      };
    }),
    valid: valid.map((test): BaseValidTestCase<O> => {
      return {
        ...test,
        code: s.unpadMultiline(test.code),
        filename: `${projectRoot}fixtures/${test.filename ?? "file.ts"}`
      };
    })
  });
}

export type Filename =
  | "camelCase.camelCase.ts"
  | "camelCase.ts"
  | "kebab-case.kebab-case.ts"
  | "kebab-case.ts"
  | "kebab-PascalCase.ts"
  | "PascalCase.PascalCase.ts"
  | "PascalCase.ts"
  | "subfolder/index.ts";

export interface InvalidTestCase<M extends string, O extends unknowns>
  extends BaseInvalidTestCase<M, O> {
  readonly errors: TestCaseErrors<M>;
  readonly filename?: Filename;
  readonly name: string;
}

export type InvalidTestCases<
  M extends string,
  O extends unknowns
> = ReadonlyArray<InvalidTestCase<M, O>>;

export interface TestCaseError<T extends string> extends BaseTestCaseError<T> {
  readonly line: number;
}

export type TestCaseErrors<T extends string> = ReadonlyArray<TestCaseError<T>>;

export interface ValidTestCase<O extends unknowns>
  extends BaseValidTestCase<O> {
  readonly filename?: Filename;
  readonly name: string;
}

export type ValidTestCases<O extends unknowns> =
  // @prettier
  ReadonlyArray<ValidTestCase<O>>;
