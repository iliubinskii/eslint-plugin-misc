/* eslint-disable no-sync -- Ok */
/* eslint-disable security/detect-non-literal-fs-filename -- Ok */

import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";
import { a, evaluate, is } from "typescript-misc";
import fs from "node:fs";
import nodePath from "node:path";
import type { strings } from "typescript-misc";

export enum MessageId {
  disallowedSource = "disallowedSource"
}

export const isStringsArray = is.factory(is.array.of, is.strings);

export const isSuboptions = is.object.factory<Suboptions>(
  { _id: is.string, hierarchy: isStringsArray },
  {}
);

export const noSiblingImport = utils.createRule({
  name: "no-sibling-import",
  isSuboptions: is.object.factory<Suboptions>(
    { _id: is.string, hierarchy: isStringsArray },
    {}
  ),
  defaultSuboptions: { hierarchy: [] },
  suboptionsKey: "rules",
  messages: {
    [MessageId.disallowedSource]: "Import from this source is not allowed"
  },
  docs: {
    description: "Restricts importing siblings.",
    suboptionTypes: { _id: "string", hierarchy: "string[][]" },
    suboptionDescriptions: {
      _id: "Id",
      hierarchy: "Allows some sibling dependencies"
    },
    failExamples: `
      // filename: file.ts
      import { x } from "./sibling-file";
    `,
    passExamples: `
      // filename: file.ts
      /*
      eslint misc/no-sibling-import: [
        error,
        {
          rules: [
            {
              hierarchy: [["./sibling-file"], ["./file"]]
            }
          ]
        }
      ]
      */
      import { x } from "./sibling-file";
      import { y } from "./folder";
    `
  },
  create: context => {
    const path = context.stripExtension(context.filename);

    const dir = nodePath.dirname(path);

    const basename = nodePath.basename(path);

    if (basename === "index" || basename.startsWith("index.")) return {};

    const matcher = evaluate(() => {
      const rules = context.options.rules.map((rule): SuboptionsExtended => {
        const matchers = rule.hierarchy.map(pattern =>
          utils.createFileMatcher(pattern, false, { dot: true })
        );

        const maxIndex = findLastIndex(`./${basename}`, matchers);

        return {
          ...rule,
          matcher: str => {
            const index = findIndex(str, matchers);

            return index !== -1 && maxIndex !== -1 && index < maxIndex;
          }
        };
      });

      return (str: string) => rules.some(rule => rule.matcher(str));
    });

    return ruleTemplates.source(ctx => {
      const source = context.stripExtension(ctx.source);

      const parts = source.split("/");

      if (parts.length === 2) {
        const sourceDir = a.first(parts);

        const sourceBasename = a.second(parts);

        const sourcePath = `${dir}/${sourceBasename}`;

        if (sourceDir === ".")
          if (matcher(source) || sourceBasename.startsWith(`${basename}.`)) {
            // Valid
          } else if (
            fs.existsSync(sourcePath) &&
            fs.statSync(sourcePath).isDirectory()
          ) {
            // Valid
          } else
            context.report({
              messageId: MessageId.disallowedSource,
              node: ctx.node
            });
      }
    });
  }
});

export interface Suboptions {
  readonly _id: string;
  readonly hierarchy: stringsArray;
}

export type stringsArray = readonly strings[];

/**
 * Finds index.
 * @param str - String.
 * @param matchers - Matchers.
 * @returns Index.
 */
function findIndex(str: string, matchers: utils.Matchers): number {
  return matchers.findIndex(matcher => matcher(str));
}

/**
 * Finds last index.
 * @param str - String.
 * @param matchers - Matchers.
 * @returns Index.
 */
function findLastIndex(str: string, matchers: utils.Matchers): number {
  return a.findLastIndex(matchers, matcher => matcher(str));
}

interface SuboptionsExtended extends Suboptions {
  readonly matcher: utils.Matcher;
}
