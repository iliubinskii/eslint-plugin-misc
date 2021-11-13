import type {
  InvalidTestCase as BaseInvalidTestCase,
  ValidTestCase as BaseValidTestCase,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import type {
  InvalidTestCases,
  TestCaseError,
  ValidTestCases
} from "./test.internal";
import type { Rec, unknowns } from "@skylib/functions";
import { o, s } from "@skylib/functions";
import { TSESLint } from "@typescript-eslint/utils";
import { projectRoot } from "./misc";

/**
 * Extracts MessageId from rule.
 *
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
 *
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
    parser: require.resolve("vue-eslint-parser"),
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2017,
      extraFileExtensions: [".vue"],
      parser: "@typescript-eslint/parser",
      project: "./tsconfig.json",
      sourceType: "module",
      tsconfigRootDir: `${projectRoot}fixtures`
    }
  });

  tester.run(name, rule, {
    invalid: invalid.map(
      (test): BaseInvalidTestCase<M, O> => ({
        ...test,
        code: s.unpadMultiline(test.code),
        errors: test.errors.map(
          (error): TestCaseError<M> => ({ endLine: error.line, ...error })
        ),
        filename: `${projectRoot}fixtures/${test.filename ?? "file.ts"}`,
        output: s.unpadMultiline(test.output ?? test.code)
      })
    ),
    valid: valid.map(
      (test): BaseValidTestCase<O> => ({
        ...test,
        code: s.unpadMultiline(test.code),
        filename: `${projectRoot}fixtures/${test.filename ?? "file.ts"}`
      })
    )
  });
}
