import { defineFn, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { Callback } from "./source.internal";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { Type } from "./source.internal";

// eslint-disable-next-line @skylib/only-export-name -- Ok
export const create = defineFn(
  /**
   * Creates rule listener.
   *
   * @param callback - Callback.
   * @returns Rule listener.
   */
  (callback: Callback): RuleListener => ({
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
  }),
  { Type }
);
