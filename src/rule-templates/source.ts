import { defineFn, is } from "typescript-misc";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export enum Type {
  export = "export",
  import = "import"
}

export const create = defineFn(
  /**
   * Creates rule listener.
   * @param callback - Callback.
   * @returns Rule listener.
   */
  (callback: Callback): RuleListener => {
    return {
      CallExpression: node => {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === "require"
        ) {
          const source = node.arguments[0];

          if (
            is.not.empty(source) &&
            source.type === AST_NODE_TYPES.Literal &&
            is.string(source.value)
          )
            callback({ node: source, source: source.value, type: Type.import });
        }
      },
      ExportAllDeclaration: node => {
        const source = node.source;

        callback({ node: source, source: source.value, type: Type.export });
      },
      ExportNamedDeclaration: node => {
        const source = node.source;

        if (source)
          callback({ node: source, source: source.value, type: Type.export });
      },
      ImportDeclaration: node => {
        const source = node.source;

        callback({ node: source, source: source.value, type: Type.import });
      },
      ImportExpression: node => {
        const source = node.source;

        if (source.type === AST_NODE_TYPES.Literal && is.string(source.value))
          callback({ node: source, source: source.value, type: Type.import });
      }
    };
  },
  { Type }
);

export interface Callback {
  /**
   * Callback.
   * @param ctx - Context.
   */
  (ctx: Ctx): void;
}

export interface Ctx {
  readonly node: TSESTree.Node;
  readonly source: string;
  readonly type: Type;
}
