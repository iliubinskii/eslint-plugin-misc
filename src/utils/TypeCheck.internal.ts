import type * as ts from "typescript";
import type { NumStr } from "real-fns";

export type Signatures = readonly ts.Signature[];

export type TypeFlagsArray = readonly ts.TypeFlags[];

export type TypePart = NumStr | ts.Type;

export type TypeParts = readonly TypePart[];
