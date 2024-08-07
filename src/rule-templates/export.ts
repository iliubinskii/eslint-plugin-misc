import * as _ from "lodash-commonjs-es";
import type * as utils from "../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "typescript-misc";
import { is } from "typescript-misc";

/**
 * Creates rule listener.
 * @param callback - Callback.
 * @returns Rule listener.
 */
export function create(callback: Callback): RuleListener {
  const exportAllDeclarations: Writable<utils.TSESTree.ExportAllDeclarations> =
    [];

  const exportDefaultDeclarations: Writable<utils.TSESTree.ExportDefaultDeclarations> =
    [];

  const exportNamedDeclarations: Writable<utils.TSESTree.ExportNamedDeclarations> =
    [];

  const identifiers: Writable<utils.TSESTree.Identifiers> = [];

  return {
    [[
      "Program > ExportAllDeclaration > Identifier",
      "Program > ExportNamedDeclaration > ClassDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > ExportSpecifier > Identifier.exported",
      "Program > ExportNamedDeclaration > FunctionDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > TSEnumDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > TSInterfaceDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > TSModuleDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration > Identifier.id",
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id"
    ].join(", ")]: (node: TSESTree.Identifier) => {
      identifiers.push(node);
    },
    "Program > ExportAllDeclaration": (node: TSESTree.ExportAllDeclaration) => {
      if (is.empty(node.exported)) exportAllDeclarations.push(node);
    },
    "Program > ExportDefaultDeclaration": (
      node: TSESTree.ExportDefaultDeclaration
    ) => {
      exportDefaultDeclarations.push(node);
    },
    "Program > ExportNamedDeclaration": (
      node: TSESTree.ExportNamedDeclaration
    ) => {
      exportNamedDeclarations.push(node);
    },
    "Program:exit": () => {
      const count =
        exportAllDeclarations.filter(declaration => !declaration.exported)
          .length +
        exportDefaultDeclarations.length +
        _.uniq(identifiers.map(identifier => identifier.name)).length;

      callback({
        exportAllDeclarations,
        exportDeclarations: [
          ...exportAllDeclarations,
          ...exportDefaultDeclarations,
          ...exportNamedDeclarations
        ],
        exportDefaultDeclarations,
        exportNamedDeclarations,
        identifiers,
        onlyExport: count === 1
      });
    }
  };
}

export interface Callback {
  /**
   * Callback.
   * @param ctx - Context.
   */
  (ctx: Ctx): void;
}

export interface Ctx {
  readonly exportAllDeclarations: utils.TSESTree.ExportAllDeclarations;
  readonly exportDeclarations: utils.TSESTree.ExportDeclarations;
  readonly exportDefaultDeclarations: utils.TSESTree.ExportDefaultDeclarations;
  readonly exportNamedDeclarations: utils.TSESTree.ExportNamedDeclarations;
  readonly identifiers: utils.TSESTree.Identifiers;
  readonly onlyExport: boolean;
}
