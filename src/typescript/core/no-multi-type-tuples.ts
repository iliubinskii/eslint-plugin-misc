import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  multiTypeTuple = "multiTypeTuple"
}

export const noMultiTypeTuples = utils.createRule({
  name: "no-multi-type-tuples",
  vue: true,
  messages: { [MessageId.multiTypeTuple]: "Multi-type tuples are not allowed" },
  docs: {
    description: "Disallows multi-type tuples.",
    failExamples: "type T = [string, number];",
    passExamples: "type T = [string, string];"
  },
  create: (context): RuleListener => ({
    TSTupleType: node => {
      if (_.uniq(node.elementTypes.map(context.getText)).length > 1)
        context.report({ messageId: MessageId.multiTypeTuple, node });
    }
  })
});
