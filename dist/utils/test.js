"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRule = exports.getMessageId = void 0;
const typescript_misc_1 = require("typescript-misc");
const utils_1 = require("@typescript-eslint/utils");
const misc_1 = require("./misc");
/**
 * Extracts MessageId from rule.
 *
 * @param rule - Rule.
 * @returns MessageId.
 */
function getMessageId(rule) {
    return typescript_misc_1.o.fromEntries.exhaustive(typescript_misc_1.o.keys(rule.meta.messages).map(key => [key, key]));
}
exports.getMessageId = getMessageId;
/**
 * Runs test.
 *
 * @param name - Name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
function testRule(name, rule, invalid, valid = []) {
    const tester = new utils_1.TSESLint.RuleTester({
        parser: require.resolve("@typescript-eslint/parser"),
        parserOptions: {
            ecmaFeatures: { jsx: true },
            ecmaVersion: 2020,
            project: "./tsconfig.json",
            sourceType: "module",
            tsconfigRootDir: `${misc_1.projectRoot}fixtures`
        }
    });
    tester.run(name, rule, {
        invalid: invalid.map((test) => ({
            ...test,
            code: typescript_misc_1.s.unpadMultiline(test.code),
            errors: test.errors.map((error) => ({ endLine: error.line, ...error })),
            filename: `${misc_1.projectRoot}fixtures/${test.filename ?? "file.ts"}`,
            output: typescript_misc_1.s.unpadMultiline(test.output ?? test.code)
        })),
        valid: valid.map((test) => ({
            ...test,
            code: typescript_misc_1.s.unpadMultiline(test.code),
            filename: `${misc_1.projectRoot}fixtures/${test.filename ?? "file.ts"}`
        }))
    });
}
exports.testRule = testRule;
//# sourceMappingURL=test.js.map