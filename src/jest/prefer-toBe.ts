/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { typescript } from "../typescript";

export const preferToBe = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: 'Use "toBe" matcher instead',
      selector:
        "CallExpression[callee.property.name=toStrictEqual] > .arguments",
      typeIsOneOf: [
        utils.TypeGroup.boolean,
        utils.TypeGroup.number,
        utils.TypeGroup.string
      ]
    }
  ],
  docs: {
    description:
      'Requires "toBe" matcher instead of "toStrictEqual" for primitive argument types.',
    failExamples: `
      const x = 1;
      expect(y).toStrictEqual(x);

    `,
    passExamples: `
      const x = {};
      expect(y).toStrictEqual(x);
    `
  }
});
