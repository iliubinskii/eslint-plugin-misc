import type * as estree from "estree";
import type { Casing, Options, esRange, esRanges } from "./misc";
import type { ReportDescriptor, RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import type { s, strings, unknowns } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
export interface Context<M extends string, O extends object, S extends object, K extends string = never> {
    readonly eol: s.Eol;
    readonly filename: string;
    /**
     * Returns comment ranges.
     *
     * @param node - Node.
     * @returns Comment ranges.
     */
    readonly getCommentRanges: (node: TSESTree.Node) => esRanges;
    /**
     * Returns comments.
     *
     * @param node - Node.
     * @returns Comments.
     */
    readonly getComments: (node: TSESTree.Node) => strings;
    /**
     * Returns range with leading comments.
     *
     * @param node - Node.
     * @returns Range with leading comments.
     */
    readonly getFullRange: (node: TSESTree.Node) => esRange;
    /**
     * Returns text with leading comments.
     *
     * @param node - Node.
     * @returns Text with leading comments.
     */
    readonly getFullText: (node: TSESTree.Node) => string;
    /**
     * Returns leading spaces.
     *
     * @param node - Node.
     * @returns Leading spaces.
     */
    readonly getLeadingSpaces: (node: TSESTree.Node) => esRange;
    /**
     * Creates location from range.
     *
     * @param range - Range.
     * @returns Location.
     */
    readonly getLoc: (range: esRange) => estree.SourceLocation;
    /**
     * Gets text from mixed source.
     *
     * @param mixed - Mixed source.
     * @returns Text.
     */
    readonly getText: (mixed: esRange | TSESTree.Comment | TSESTree.Node | number) => string;
    /**
     * Checks if node has trailing comment.
     *
     * @param node - Node.
     * @returns _True_ if node has trailing comment, _false_ otherwise.
     */
    readonly hasTrailingComment: (node: TSESTree.Node) => boolean;
    /**
     * Creates identifier from path.
     *
     * @param path - Path.
     * @param expected - Expected identifier.
     * @returns Identifier.
     */
    readonly identifierFromPath: (path: string, expected?: string) => string;
    /**
     * Checks if two nodes are adjustent.
     *
     * @param node1 - First node.
     * @param node2 - Second node.
     * @returns _True_ if two nodes are adjustent, _false_ otherwise.
     */
    readonly isAdjacentNodes: (node1: TSESTree.Node, node2: TSESTree.Node) => boolean;
    readonly locZero: TSESTree.SourceLocation;
    /**
     * Normalizes source.
     *
     * @param source - Source.
     * @returns Normalized source.
     */
    readonly normalizeSource: (source: string) => string;
    readonly options: Options<O, S, K>;
    readonly rawContext: Readonly<RuleContext<any, any>>;
    /**
     * Reports error.
     *
     * @param descriptor - Descriptor.
     */
    readonly report: (descriptor: ReportDescriptor<M>) => void;
    readonly scope: ReturnType<RuleContext<M, unknowns>["getScope"]>;
    /**
     * Strips extension.
     *
     * @param path - Path.
     * @returns Stripped path.
     */
    readonly stripExtension: (path: string) => string;
    /**
     * Creates text from path.
     *
     * @param path - Path.
     * @param expected - Expected text.
     * @param format - Format.
     * @returns Text.
     */
    readonly textFromPath: (path: string, expected: string, format: Casing | undefined) => string;
}
//# sourceMappingURL=context.d.ts.map