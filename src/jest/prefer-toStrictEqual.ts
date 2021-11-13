/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { typescript } from "../typescript";

export const preferToStrictEqual = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: 'Use "toStrictEqual" matcher instead',
      selector: "CallExpression[callee.property.name=toBe] > .arguments",
      typeIsNoneOf: [
        utils.TypeGroup.boolean,
        utils.TypeGroup.number,
        utils.TypeGroup.string
      ]
    }
  ],
  docs: {
    description:
      'Requires "toStrictEqual" matcher instead of "toBe" for non-primitive argument types.',
    failExamples: `
      const x = {};
      expect(y).toStrictEqual(x);
    `,
    passExamples: `
      const x = 1;
      expect(y).toStrictEqual(x);
    `
  }
});
