import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { Writable, strings } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import minimatch from "minimatch";

export interface Suboptions {
  readonly _id: string;
  readonly altLocalNames: strings;
  readonly autoImport: boolean;
  readonly autoImportSource?: string;
  readonly localName?: string;
  readonly source: string;
  readonly sourcePattern?: string;
  readonly wildcard: boolean;
}

export enum MessageId {
  autoImport = "autoImport",
  invalidLocalName = "invalidLocalName",
  wildcardDisallowed = "wildcardDisallowed",
  wildcardRequired = "wildcardRequired"
}

export const consistentImport = utils.createRule({
  name: "consistent-import",
  fixable: utils.Fixable.code,
  vue: true,
  isSuboptions: is.object.factory<Suboptions>(
    {
      _id: is.string,
      altLocalNames: is.strings,
      autoImport: is.boolean,
      source: is.string,
      wildcard: is.boolean
    },
    {
      autoImportSource: is.string,
      localName: is.string,
      sourcePattern: is.string
    }
  ),
  defaultSuboptions: { altLocalNames: [], autoImport: false, wildcard: false },
  suboptionsKey: "sources",
  messages: {
    [MessageId.autoImport]:
      'Run "eslint --fix" to add missing import statement(s)',
    [MessageId.invalidLocalName]:
      "Expecting local name to be: {{expectedLocalName}} ({{_id}}, source: {{source}})",
    [MessageId.wildcardDisallowed]:
      "Wildcard import disallowed ({{_id}}, source: {{source}})",
    [MessageId.wildcardRequired]:
      "Wildcard import required ({{_id}}, source: {{source}})"
  },
  docs: {
    description: "Requires consistent import.",
    suboptionTypes: {
      _id: "string",
      altLocalNames: "string[]",
      autoImport: "boolean",
      autoImportSource: "string",
      localName: "string",
      source: "string",
      sourcePattern: "string",
      wildcard: "boolean"
    },
    suboptionDescriptions: {
      _id: "Id",
      altLocalNames: "Alternative local names",
      autoImport: "Enable auto-import",
      autoImportSource: 'Auto-import source (defaults to "source")',
      localName: "Local name",
      source: "Source",
      sourcePattern: "Soure pattern (minimatch)",
      wildcard: "Prefer wildcard import"
    },
    failExamples: `
      /*
      eslint @skylib/consistent-import: [
        error,
        {
          sources: [
            {
              _id: "catch-all",
              source: "**"
            },
            {
              _id: "source2",
              source: "source2",
              wildcard: true
            }
          ]
        }
      ]
      */
      import * as source1 from "source1"; // Wildcard import disallowed
      import { item1 } from "source2"; // Wildcard import required
      import * as invalidLocalName from "source2"; // Invalid local name
    `,
    passExamples: `
      /*
      eslint @skylib/consistent-import: [
        error,
        {
          sources: [
            {
              _id: "catch-all",
              source: "**"
            },
            {
              _id: "source2",
              source: "source2",
              wildcard: true
            }
          ]
        }
      ]
      */
      import { item1 } from "source1";
      import * as source2 from "source2";
    `
  },
  create: (context): RuleListener => {
    const eol = context.eol;

    // eslint-disable-next-line @skylib/functions/prefer-ReadonlySet -- Ok
    const identifiers = new Set<string>();

    const importDeclarations: Writable<utils.TSESTree.ImportDeclarations> = [];

    return {
      ":not(ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Property) > Identifier":
        (node: TSESTree.Identifier) => {
          identifiers.add(node.name);
        },
      "ExportAllDeclaration": node => {
        if (node.exported) {
          const source = context.normalizeSource(node.source.value);

          const suboptions = findSuboptions(source);

          if (suboptions) {
            const { _id, localName, wildcard } = suboptions;

            if (wildcard)
              if (node.exported.name === localName) {
                // Valid name
              } else
                context.report({
                  data: { _id, expectedLocalName: localName, source },
                  messageId: MessageId.invalidLocalName,
                  node
                });
            else
              context.report({
                data: { _id, source },
                messageId: MessageId.wildcardDisallowed,
                node
              });
          }
        }
      },
      "ExportNamedDeclaration": node => {
        if (node.source) {
          const source = context.normalizeSource(node.source.value);

          const suboptions = findSuboptions(source);

          if (suboptions) {
            const { _id, localName, wildcard } = suboptions;

            if (wildcard)
              context.report({
                data: { _id, source },
                messageId: MessageId.wildcardRequired,
                node
              });
            else {
              const specifier = node.specifiers.find(
                candidate => candidate.local.name === "default"
              );

              if (specifier)
                if (specifier.exported.name === localName) {
                  // Valid name
                } else
                  context.report({
                    data: { _id, expectedLocalName: localName, source },
                    messageId: MessageId.invalidLocalName,
                    node
                  });
            }
          }
        }
      },
      "ImportDeclaration": node => {
        importDeclarations.push(node);
      },
      "Program:exit": (node: TSESTree.Program) => {
        lintAutoImport(node);
        lintConsistentImport();
      },
      "Property > Identifier.value": (node: TSESTree.Identifier) => {
        identifiers.add(node.name);
      }
    };

    function expectedLocalName(
      localName: string,
      altLocalNames: strings
    ): string {
      return identifiers.has(localName) && altLocalNames.length
        ? altLocalNames.join(", ")
        : localName;
    }

    function findSuboptions(source: string): SuboptionsExtended | undefined {
      const suboptions = context.options.sources.find(candidate =>
        minimatch(source, candidate.sourcePattern ?? candidate.source, {
          dot: true
        })
      );

      return suboptions
        ? { localName: context.identifierFromPath(source), ...suboptions }
        : undefined;
    }

    function lintAutoImport(node: TSESTree.Program): void {
      const fixes = _.uniq(
        context.options.sources.flatMap(suboptions => {
          const { autoImport, autoImportSource, localName, wildcard } = {
            autoImportSource: suboptions.source,
            localName: context.identifierFromPath(suboptions.source),
            ...suboptions
          };

          return autoImport
            ? context.scope.through
                .map(ref => {
                  if (ref.identifier.name === localName) {
                    context.report({
                      messageId: MessageId.autoImport,
                      node: ref.identifier
                    });

                    return wildcard
                      ? `import * as ${localName} from "${autoImportSource}";`
                      : `import ${localName} from "${autoImportSource}";`;
                  }

                  return undefined;
                })
                .filter(is.not.empty)
            : [];
        })
      );

      if (fixes.length)
        context.report({
          fix: (): RuleFix => {
            const fix = fixes.join(eol);

            return {
              range: [node.range[0], node.range[0]],
              text: `${fix}${eol}`
            };
          },
          loc: context.locZero,
          messageId: MessageId.autoImport
        });
    }

    function lintConsistentImport(): void {
      for (const node of importDeclarations) {
        const source = context.normalizeSource(node.source.value);

        const suboptions = findSuboptions(source);

        if (suboptions) {
          const { _id, altLocalNames, localName, wildcard } = suboptions;

          const wildcardSpecifier = node.specifiers.find(
            candidate =>
              candidate.type === AST_NODE_TYPES.ImportNamespaceSpecifier
          );

          const defaultSpecifier = node.specifiers.find(
            candidate =>
              candidate.type === AST_NODE_TYPES.ImportDefaultSpecifier
          );

          if (wildcard)
            if (wildcardSpecifier)
              if (wildcardSpecifier.local.name === localName) {
                // Valid name
              } else if (
                identifiers.has(localName) &&
                altLocalNames.includes(wildcardSpecifier.local.name)
              ) {
                // Valid alt name
              } else
                context.report({
                  data: {
                    _id,
                    expectedLocalName: expectedLocalName(
                      localName,
                      altLocalNames
                    ),
                    source
                  },
                  messageId: MessageId.invalidLocalName,
                  node
                });
            else
              context.report({
                data: { _id, source },
                messageId: MessageId.wildcardRequired,
                node
              });
          else {
            if (defaultSpecifier)
              if (defaultSpecifier.local.name === localName) {
                // Valid name
              } else if (
                identifiers.has(localName) &&
                altLocalNames.includes(defaultSpecifier.local.name)
              ) {
                // Valid alt name
              } else
                context.report({
                  data: {
                    _id,
                    expectedLocalName: expectedLocalName(
                      localName,
                      altLocalNames
                    ),
                    source
                  },
                  messageId: MessageId.invalidLocalName,
                  node
                });

            if (wildcardSpecifier)
              context.report({
                data: { _id, source },
                messageId: MessageId.wildcardDisallowed,
                node
              });
          }
        }
      }
    }
  }
});

interface SuboptionsExtended extends Suboptions {
  readonly localName: string;
}
