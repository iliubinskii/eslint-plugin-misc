"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortExportSpecifiers = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
exports.sortExportSpecifiers = utils.createRule({
    name: "sort-export-specifiers",
    fixable: utils.Fixable.code,
    messages: utils.sort.messages,
    docs: {
        description: "Sorts export specifiers.",
        failExamples: "export { b, a };",
        passExamples: "export { a, b };"
    },
    create: (context) => {
        return {
            ExportNamedDeclaration: node => {
                utils.sort(node.specifiers, context, { keyNode });
            }
        };
    }
});
/**
 * Returns key node.
 * @param node - Node.
 * @returns Key node.
 */
function keyNode(node) {
    return node.local;
}
//# sourceMappingURL=sort-export-specifiers.js.map