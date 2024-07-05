/* eslint-disable unicorn/prefer-module -- Ok */
import { o, s } from "typescript-misc";
import { TSESLint } from "@typescript-eslint/utils";
import { projectRoot } from "./misc";
/**
 * Extracts MessageId from rule.
 *
 * @param rule - Rule.
 * @returns MessageId.
 */
export function getMessageId(rule) {
    return o.fromEntries.exhaustive(o.keys(rule.meta.messages).map(key => [key, key]));
}
/**
 * Runs test.
 *
 * @param name - Name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
export function testRule(name, rule, invalid, valid = []) {
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
        invalid: invalid.map((test) => ({
            ...test,
            code: s.unpadMultiline(test.code),
            errors: test.errors.map((error) => ({ endLine: error.line, ...error })),
            filename: `${projectRoot}fixtures/${test.filename ?? "file.ts"}`,
            output: s.unpadMultiline(test.output ?? test.code)
        })),
        valid: valid.map((test) => ({
            ...test,
            code: s.unpadMultiline(test.code),
            filename: `${projectRoot}fixtures/${test.filename ?? "file.ts"}`
        }))
    });
}
//# sourceMappingURL=test.js.map