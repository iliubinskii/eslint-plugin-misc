import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";
import { is } from "@skylib/functions";

export interface Options {
  readonly selector: utils.Selector;
}

export enum MessageId {
  invalidExport = "invalidExport"
}

export const preferOnlyExport = utils.createRule({
  name: "prefer-only-export",
  vue: true,
  isOptions: is.object.factory<Options>({ selector: utils.isSelector }, {}),
  defaultOptions: { selector: [] },
  messages: { [MessageId.invalidExport]: "Expecting only export" },
  docs: {
    description: "Requires only export if given AST element if found.",
    optionTypes: { selector: "string | string[]" },
    optionDescriptions: { selector: "AST selector" },
    failExamples: `
      /*
      eslint @skylib/prefer-only-export: [
        error,
        {
          selector: "Program > ExportNamedDeclaration > ClassDeclaration"
        }
      ]
      */
      export class SampleClass {}
      export const x = 1;
    `,
    passExamples: `
      /*
      eslint @skylib/prefer-only-export: [
        error,
        {
          selector: "Program > ExportNamedDeclaration > ClassDeclaration"
        }
      ]
      */
      export class SampleClass {}
    `
  },
  create: context => {
    const { selector: mixedSelector } = context.options;

    const selector = utils.selector(mixedSelector);

    let activated = false;

    return utils.mergeListeners(
      {
        [selector]: () => {
          activated = true;
        }
      },
      ruleTemplates.export(ctx => {
        const { identifiers, onlyExport } = ctx;

        if (activated && !onlyExport)
          for (const node of identifiers)
            context.report({ messageId: MessageId.invalidExport, node });
      })
    );
  }
});
