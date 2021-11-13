import type { Callback } from "./source.internal";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { Type } from "./source.internal";
export declare const create: ((callback: Callback) => RuleListener) & Readonly<{
    Type: typeof Type;
}>;
//# sourceMappingURL=source.d.ts.map