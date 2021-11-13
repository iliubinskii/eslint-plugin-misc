import type { Docs } from "./types";
import type { RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
import type { unknowns } from "@skylib/functions";

export interface WrapRuleOptions<M extends string, O extends unknowns> {
  readonly docs?: Docs;
  readonly options: O;
  readonly rule: RuleModule<M, O>;
}
