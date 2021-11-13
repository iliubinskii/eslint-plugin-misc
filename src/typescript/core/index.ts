import { arrayCallbackReturnType } from "./array-callback-return-type";
import { exhaustiveSwitch } from "./exhaustive-switch";
import { noInferrableTypes } from "./no-inferrable-types";
import { noMultiTypeTuples } from "./no-multi-type-tuples";
import { noRestrictedSyntax } from "./no-restricted-syntax";
import { noUnsafeObjectAssignment } from "./no-unsafe-object-assignment";

export const core = {
  "array-callback-return-type": arrayCallbackReturnType,
  "exhaustive-switch": exhaustiveSwitch,
  "no-inferrable-types": noInferrableTypes,
  "no-multi-type-tuples": noMultiTypeTuples,
  "no-restricted-syntax": noRestrictedSyntax,
  "no-unsafe-object-assignment": noUnsafeObjectAssignment
} as const;
