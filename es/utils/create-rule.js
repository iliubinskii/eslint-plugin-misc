/* eslint-disable no-sync -- Ok */
/* eslint-disable security/detect-non-literal-fs-filename -- Ok */
import { a, assert, classToInterface, evaluate, is, json, o, s } from "typescript-misc";
import { createFileMatcher, projectRoot, setCasing } from "./misc";
import { Casing } from "./types";
import { ESLintUtils } from "@typescript-eslint/utils";
import { TypeCheck } from "./TypeCheck";
import fs from "node:fs";
import nodePath from "node:path";
/**
 * Creates rule listener.
 *
 * @param options - Options.
 * @returns Rule listener.
 */
export function createRule(options) {
    const { create, defaultOptions, defaultSuboptions, docs: rawDocs, fixable, hasSuggestions, messages, suboptionsKey } = options;
    const docs = {
        recommended: "recommended",
        requiresTypeChecking: true,
        ...o.removeUndefinedKeys.alt({
            ...rawDocs,
            defaultOptions,
            defaultSuboptions,
            description: s.unpadMultiline(rawDocs.description),
            failExamples: s.unpadMultiline(rawDocs.failExamples),
            passExamples: s.unpadMultiline(rawDocs.passExamples),
            suboptionsKey
        })
    };
    const ruleCreator = ESLintUtils.RuleCreator((name) => `https://iliubinskii.github.io/eslint-plugin-misc/${name}.html`);
    return ruleCreator({
        create: (rawContext, rawOptions) => {
            const context = createContext(rawContext, rawOptions, options);
            const typeCheck = classToInterface(new TypeCheck(rawContext));
            return create(context, typeCheck);
        },
        defaultOptions: [{ ...defaultOptions }],
        meta: {
            docs,
            messages,
            schema: { type: "array" },
            type: "suggestion",
            ...o.removeUndefinedKeys.alt({ fixable, hasSuggestions })
        },
        name: options.name
    });
}
/**
 * Parses package.json file.
 *
 * @param path - Path.
 * @returns Project configuration.
 */
export function getProjectConfig(path = "package.json") {
    if (fs.existsSync(path)) {
        const result = json.decode(fs.readFileSync(path).toString());
        if (isProjectConfig(result))
            return result;
    }
    return {};
}
const isSharedSuboptions = is.object.factory({}, { filesToLint: is.strings, filesToSkip: is.strings });
/**
 * Determines if file should be linted.
 *
 * @param path - Path.
 * @param options - Options.
 * @returns _True_ if file should be linted, _false_ otherwise.
 */
function shouldBeLinted(path, options) {
    const matcher = createFileMatcher({ allow: options.filesToLint ?? [], disallow: options.filesToSkip ?? [] }, false, { dot: true, matchBase: true });
    const disallow = matcher(stripBase(s.path.canonicalize(path), "./"));
    return !disallow;
}
/**
 * Strips base path.
 *
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
function stripBase(path, replacement = "") {
    assert.toBeTrue(s.path.canonicalize(path).startsWith(projectRoot), `Expecting path to be inside project folder: ${path}`);
    return `${replacement}${path.slice(projectRoot.length)}`;
}
const isProjectConfig = is.factory(is.object.of, {}, { name: is.string });
/**
 * Creates context.
 *
 * @param context - Raw context.
 * @param ruleOptionsArray - Rule options.
 * @param options - Options.
 * @returns Context.
 */
function createContext(context, ruleOptionsArray, options) {
    const filename = context.getFilename();
    const projectConfig = getProjectConfig();
    const source = context.getSourceCode();
    const code = source.getText();
    return {
        eol: s.detectEol(code),
        filename,
        getCommentRanges,
        getComments: node => getCommentRanges(node).map(range => code.slice(...range)),
        getFullRange,
        getFullText: node => code.slice(...getFullRange(node)),
        getLeadingSpaces: node => {
            const end = getFullRange(node)[0];
            const pos = code.slice(0, end).trimEnd().length;
            return [pos, end];
        },
        getLoc: (range) => ({
            end: source.getLocFromIndex(range[1]),
            start: source.getLocFromIndex(range[0])
        }),
        getText,
        hasComments: node => getCommentRanges(node).length > 0,
        hasTrailingComment: node => code.slice(node.range[1]).trimStart().startsWith("//"),
        identifierFromPath,
        isAdjacentNodes: (node1, node2) => {
            if (node1.parent === node2.parent) {
                const pos = node1.range[1];
                const end = getFullRange(node2)[0];
                if (pos <= end)
                    return ["", ","].includes(code.slice(pos, end).trim());
            }
            return false;
        },
        locZero: {
            end: source.getLocFromIndex(0),
            start: source.getLocFromIndex(0)
        },
        normalizeSource: src => s.path.canonicalize(evaluate(() => {
            if (src === "@") {
                assert.not.empty(projectConfig.name, "Missing package name");
                return `${projectConfig.name}/src`;
            }
            if (src.startsWith("@/")) {
                assert.not.empty(projectConfig.name, "Missing package name");
                return `${projectConfig.name}/src/${src.slice(2)}`;
            }
            if (src === "." ||
                src === ".." ||
                src.startsWith("./") ||
                src.startsWith("../")) {
                assert.not.empty(projectConfig.name, "Missing package name");
                const path = nodePath.join(nodePath.dirname(filename), src);
                return `${projectConfig.name}/${stripBase(path)}`;
            }
            return src;
        })),
        options: evaluate(() => {
            const { defaultSuboptions, isOptions, isSuboptions, suboptionsKey } = {
                isOptions: is.unknown,
                ...options
            };
            const rawRuleOptions = ruleOptionsArray[0];
            assert.byGuard(rawRuleOptions, isOptions, "Expecting valid rule options");
            const result = defaultSuboptions || isSuboptions || is.not.empty(suboptionsKey)
                ? evaluate(() => {
                    assert.not.empty(isSuboptions, "Expecting suboptions guard");
                    assert.not.empty(suboptionsKey, "Expecting suboptions key");
                    const suboptionsArray = o.get(rawRuleOptions, suboptionsKey) ?? [];
                    assert.array.of(suboptionsArray, is.object, "Expecting valid rule options");
                    const suboptionsArrayWithDefaults = suboptionsArray.map((suboptions) => ({
                        ...defaultSuboptions,
                        ...suboptions
                    }));
                    const isSuboptionsWithShared = is.and.factory(isSharedSuboptions, isSuboptions);
                    assert.array.of(suboptionsArrayWithDefaults, isSuboptionsWithShared, "Expecting valid rule options");
                    const ruleOptionsWithSuboptions = {
                        ...rawRuleOptions,
                        [suboptionsKey]: suboptionsArrayWithDefaults.filter(suboptions => shouldBeLinted(filename, suboptions))
                    };
                    return ruleOptionsWithSuboptions;
                })
                : rawRuleOptions;
            return result;
        }),
        rawContext: context,
        report: context.report.bind(context),
        stripExtension,
        textFromPath
    };
    function getCommentRanges(node) {
        return source.getCommentsBefore(node).map(comment => comment.range);
    }
    function getFullRange(node) {
        return [
            Math.min(node.range[0], ...getCommentRanges(node).map(range => range[0])),
            node.range[1]
        ];
    }
    function getText(mixed) {
        if (is.number(mixed))
            return code.slice(mixed);
        if (is.array(mixed))
            return code.slice(...mixed);
        return code.slice(...mixed.range);
    }
    function identifierFromPath(path, expected) {
        const { base, dir } = nodePath.parse(path);
        const name = stripExtension(base);
        if (name === "index")
            return identifierFromPath(dir, expected);
        const candidates = a
            .omit(name.split("."), (part, index) => index === 0 && part === "index")
            .map(part => setCasing(part, /^[A-Z]/u.test(part) ? Casing.pascalCase : Casing.camelCase));
        return is.not.empty(expected) && candidates.includes(expected)
            ? expected
            : a.first(candidates);
    }
    function stripExtension(str) {
        for (const ext of [".js", ".jsx", ".ts", ".tsx"])
            if (str.endsWith(ext))
                return str.slice(0, -ext.length);
        return str;
    }
    function textFromPath(path, expected, format) {
        const { base, dir } = nodePath.parse(path);
        const name = stripExtension(base);
        if (name === "index")
            return textFromPath(dir, expected, format);
        const candidates = name
            .split(".")
            .filter((part, index) => !(index === 0 && part === "index"))
            .map(part => setCasing(part, format));
        return candidates.includes(expected) ? expected : a.first(candidates);
    }
}
//# sourceMappingURL=create-rule.js.map