import { o, s } from "real-fns";
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
            ecmaVersion: 2017,
            project: "./tsconfig.json",
            sourceType: "module",
            tsconfigRootDir: `${projectRoot}fixtures`
        }
    });
    tester.run(name, rule, {
        invalid: invalid.map((test) => {
            var _a, _b;
            return (Object.assign(Object.assign({}, test), { code: s.unpadMultiline(test.code), errors: test.errors.map((error) => (Object.assign({ endLine: error.line }, error))), filename: `${projectRoot}fixtures/${(_a = test.filename) !== null && _a !== void 0 ? _a : "file.ts"}`, output: s.unpadMultiline((_b = test.output) !== null && _b !== void 0 ? _b : test.code) }));
        }),
        valid: valid.map((test) => {
            var _a;
            return (Object.assign(Object.assign({}, test), { code: s.unpadMultiline(test.code), filename: `${projectRoot}fixtures/${(_a = test.filename) !== null && _a !== void 0 ? _a : "file.ts"}` }));
        })
    });
}
//# sourceMappingURL=test.js.map