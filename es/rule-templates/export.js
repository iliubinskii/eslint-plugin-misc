import * as _ from "lodash-commonjs-es";
import { is } from "typescript-misc";
/**
 * Creates rule listener.
 * @param callback - Callback.
 * @returns Rule listener.
 */
export function create(callback) {
    const exportAllDeclarations = [];
    const exportDefaultDeclarations = [];
    const exportNamedDeclarations = [];
    const identifiers = [];
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
        ].join(", ")]: (node) => {
            identifiers.push(node);
        },
        "Program > ExportAllDeclaration": (node) => {
            if (is.empty(node.exported))
                exportAllDeclarations.push(node);
        },
        "Program > ExportDefaultDeclaration": (node) => {
            exportDefaultDeclarations.push(node);
        },
        "Program > ExportNamedDeclaration": (node) => {
            exportNamedDeclarations.push(node);
        },
        "Program:exit": () => {
            const count = exportAllDeclarations.filter(declaration => !declaration.exported)
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
//# sourceMappingURL=export.js.map