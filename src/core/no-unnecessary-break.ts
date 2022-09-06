import * as utils from "../utils";
import { base } from "./base";

export const noUnnecessaryBreak = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: 'Unnecessary "break" statement',
      selector: "SwitchCase:last-child > BreakStatement.consequent"
    }
  ],
  docs: {
    description: 'Disallows unnecessary "break".',
    failExamples: `
      switch (x) {
        case 1:
          break;

        case 2:
          break;
      }
    `,
    passExamples: `
      switch (x) {
        case 1:
          break;

        case 2:
      }
    `
  }
});
