/* eslint-disable @skylib/consistent-filename -- Ok */

import type { TSESTree } from "@typescript-eslint/utils";

export type ExportAllDeclarations = readonly TSESTree.ExportAllDeclaration[];

export type ExportDeclaration =
  | TSESTree.ExportAllDeclaration
  | TSESTree.ExportDefaultDeclaration
  | TSESTree.ExportNamedDeclaration;

export type ExportDeclarations = readonly ExportDeclaration[];

export type ExportDefaultDeclarations =
  readonly TSESTree.ExportDefaultDeclaration[];

export type ExportNamedDeclarations =
  readonly TSESTree.ExportNamedDeclaration[];

export type Identifiers = readonly TSESTree.Identifier[];

export type ImportDeclarations = readonly TSESTree.ImportDeclaration[];

export type Nodes = readonly TSESTree.Node[];
