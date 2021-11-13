/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { typescript } from "../typescript";

export const noToThrowLiteral = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "String argument is not allowed",
      selector: "CallExpression[callee.property.name=toThrow] > .arguments",
      typeIs: utils.TypeGroup.string
    }
  ],
  docs: {
    description: 'Disallows string argument in "toThrow" matcher.',
    failExamples: 'expect(f).toThrow("Error message");',
    passExamples: 'expect(f).toThrow(new Error("Error message"));'
  }
});
