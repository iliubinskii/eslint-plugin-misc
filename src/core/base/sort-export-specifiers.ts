import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export const sortExportSpecifiers = utils.createRule({
  name: "sort-export-specifiers",
  fixable: utils.Fixable.code,
  messages: utils.sort.messages,
  docs: {
    description: "Sorts export specifiers.",
    failExamples: "export { b, a };",
    passExamples: "export { a, b };"
  },
  create: (context): RuleListener => ({
    ExportNamedDeclaration: node => {
      utils.sort(node.specifiers, context, { keyNode });
    }
  })
});

/**
 * Returns key node.
 *
 * @param node - Node.
 * @returns Key node.
 */
function keyNode(node: TSESTree.ExportSpecifier): TSESTree.Node {
  return node.local;
}
