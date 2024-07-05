import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";
import { is } from "typescript-misc";

export enum MessageId {
  disallowedSource = "disallowedSource"
}

export const disallowImport = utils.createRule({
  name: "disallow-import",
  isOptions: is.object.factory<Options>(
    { allow: utils.isFilePattern, disallow: utils.isFilePattern },
    {}
  ),
  defaultOptions: { allow: [], disallow: [] },
  messages: {
    [MessageId.disallowedSource]: "Import from this source is not allowed"
  },
  docs: {
    description: "Disallows import given sources.",
    optionTypes: { allow: "string | string[]", disallow: "string | string[]" },
    optionDescriptions: {
      allow: "Allowed sources (minimatch)",
      disallow: "Disallowed sources (minimatch)"
    },
    failExamples: `
      /*
      eslint misc/disallow-import: [
        error,
        {
          disallow: "source1"
        }
      ]
      */
      import * as source1 from "source1";
    `,
    passExamples: `
      /*
      eslint misc/disallow-import: [
        error,
        {
          disallow: "source1"
        }
      ]
      */
      import * as source2 from "source2";
    `
  },
  create: context => {
    const matcher = utils.createFileMatcher(context.options, false, {
      dot: true
    });

    return ruleTemplates.source(ctx => {
      if (matcher(ctx.source))
        context.report({
          messageId: MessageId.disallowedSource,
          node: ctx.node
        });
    });
  }
});

export interface Options {
  readonly allow: utils.FilePattern;
  readonly disallow: utils.FilePattern;
}
