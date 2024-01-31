import type {
  ContextOptionsArray,
  CreateRuleOptions,
  PartialOptionsArray
} from "./create-rule.internal";
import type {
  RuleContext,
  RuleListener,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import { classToInterface, o, s } from "typescript-misc";
import { ESLintUtils } from "@typescript-eslint/utils";
import { TypeCheck } from "./TypeCheck";
import { createContext } from "./create-rule.internal";

/**
 * Creates rule listener.
 *
 * @param options - Options.
 * @returns Rule listener.
 */
export function createRule<
  M extends string,
  O extends object,
  S extends object,
  K extends string = never
>(
  options: CreateRuleOptions<M, O, S, K>
): RuleModule<M, PartialOptionsArray<O, S, K>> {
  const {
    create,
    defaultOptions,
    defaultSuboptions,
    docs: rawDocs,
    fixable,
    hasSuggestions,
    messages,
    suboptionsKey
  } = options;

  const docs: ESLintUtils.NamedCreateRuleMetaDocs = {
    recommended: false,
    requiresTypeChecking: true,
    ...o.removeUndefinedKeys.alt({
      ...rawDocs,
      defaultOptions,
      defaultSuboptions,
      description: s.unpadMultiline(rawDocs.description),
      failExamples: s.unpadMultiline(rawDocs.failExamples),
      passExamples: s.unpadMultiline(rawDocs.passExamples),
      suboptionsKey
    })
  };

  const ruleCreator = ESLintUtils.RuleCreator(
    (name: string) =>
      `https://iliubinskii.github.io/eslint-plugin-misc/${name}.html`
  );

  return ruleCreator({
    create: (
      rawContext: RuleContext<M, ContextOptionsArray>,
      rawOptions
    ): RuleListener => {
      const context = createContext(rawContext, rawOptions, options);

      const typeCheck = classToInterface(new TypeCheck(rawContext));

      return create(context, typeCheck);
    },
    defaultOptions: [defaultOptions ?? {}],
    meta: {
      docs,
      messages,
      schema: [{}],
      type: "suggestion",
      ...o.removeUndefinedKeys.alt({ fixable, hasSuggestions })
    },
    name: options.name
  });
}
