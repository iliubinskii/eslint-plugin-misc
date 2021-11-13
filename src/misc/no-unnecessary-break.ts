import * as utils from "../utils";
import { core } from "./core";

export const noUnnecessaryBreak = utils.wrapRule({
  rule: core["no-restricted-syntax"],
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
