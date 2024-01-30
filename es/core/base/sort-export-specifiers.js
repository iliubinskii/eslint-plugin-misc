import * as utils from "../../utils";
export const sortExportSpecifiers = utils.createRule({
    name: "sort-export-specifiers",
    fixable: utils.Fixable.code,
    messages: utils.sort.messages,
    docs: {
        description: "Sorts export specifiers.",
        failExamples: "export { b, a };",
        passExamples: "export { a, b };"
    },
    create: (context) => ({
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
function keyNode(node) {
    return node.local;
}
//# sourceMappingURL=sort-export-specifiers.js.map