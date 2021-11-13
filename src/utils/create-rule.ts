import type {
  ContextOptionsArray,
  CreateRuleOptions,
  PartialOptionsArray
} from "./create-rule.internal";
import type {
  RuleContext,
  RuleFunction,
  RuleListener,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import { classToInterface, is, o, s } from "@skylib/functions";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";
import { TypeCheck } from "./TypeCheck";
import { createContext } from "./create-rule.internal";

/**
 * Creates rule listenter.
 *
 * @param options - Options.
 * @returns Rule listenter.
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
    messages,
    suboptionsKey,
    vue
  } = options;

  const docs: ESLintUtils.NamedCreateRuleMetaDocs = {
    recommended: false,
    requiresTypeChecking: true,
    ...o.removeUndefinedKeys({
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
    (name: string) => `https://ilyub.github.io/eslint-plugin/${name}.html`
  );

  return ruleCreator({
    create: (
      rawContext: RuleContext<M, ContextOptionsArray>,
      rawOptions
    ): RuleListener => {
      const { parserServices } = rawContext;

      const context = createContext(rawContext, rawOptions, options);

      const typeCheck = classToInterface(new TypeCheck(rawContext));

      const result = create(context, typeCheck);

      if (vue && is.not.empty(parserServices)) {
        const defineTemplateBodyVisitor = o.get(
          parserServices,
          "defineTemplateBodyVisitor"
        );

        if (is.callable<DefineTemplateBodyVisitor>(defineTemplateBodyVisitor)) {
          const { "Program:exit": oldProgramExit, ...oldVisitors } = result;

          const { "Program:exit": newProgramExit, ...newVisitors } =
            defineTemplateBodyVisitor(oldVisitors, oldVisitors);

          return {
            ...newVisitors,
            "Program:exit": (node: TSESTree.Node) => {
              if (is.callable<RuleFunction<TSESTree.Node>>(newProgramExit))
                newProgramExit(node);

              if (is.callable<RuleFunction<TSESTree.Node>>(oldProgramExit))
                oldProgramExit(node);
            }
          };
        }
      }

      return result;
    },
    defaultOptions: [defaultOptions ?? {}],
    meta: {
      docs,
      messages,
      schema: [{}],
      type: "suggestion",
      ...o.removeUndefinedKeys({ fixable })
    },
    name: options.name
  });
}

interface DefineTemplateBodyVisitor {
  /**
   * Defines template body visitor.
   *
   * @param templateVisitor - Template visitor.
   * @param scriptVisitor - Script visitor.
   * @param options - Options.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Ok
  (templateVisitor: any, scriptVisitor?: any, options?: any): RuleListener;
}
