"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const typescript_misc_1 = require("typescript-misc");
const utils_1 = require("@typescript-eslint/utils");
const source_internal_1 = require("./source.internal");
// eslint-disable-next-line misc/only-export-name -- Ok
exports.create = (0, typescript_misc_1.defineFn)(
/**
 * Creates rule listener.
 *
 * @param callback - Callback.
 * @returns Rule listener.
 */
(callback) => ({
    CallExpression: node => {
        if (node.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
            node.callee.name === "require") {
            const source = node.arguments[0];
            if (typescript_misc_1.is.not.empty(source) &&
                source.type === utils_1.AST_NODE_TYPES.Literal &&
                typescript_misc_1.is.string(source.value))
                callback({ node: source, source: source.value, type: source_internal_1.Type.import });
        }
    },
    ExportAllDeclaration: node => {
        const source = node.source;
        callback({ node: source, source: source.value, type: source_internal_1.Type.export });
    },
    ExportNamedDeclaration: node => {
        const source = node.source;
        if (source)
            callback({ node: source, source: source.value, type: source_internal_1.Type.export });
    },
    ImportDeclaration: node => {
        const source = node.source;
        callback({ node: source, source: source.value, type: source_internal_1.Type.import });
    },
    ImportExpression: node => {
        const source = node.source;
        if (source.type === utils_1.AST_NODE_TYPES.Literal && typescript_misc_1.is.string(source.value))
            callback({ node: source, source: source.value, type: source_internal_1.Type.import });
    }
}), { Type: source_internal_1.Type });
//# sourceMappingURL=source.js.map