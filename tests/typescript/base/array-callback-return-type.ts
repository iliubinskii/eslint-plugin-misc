import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/array-callback-return-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "array-callback-return-type",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        [1, true].every(x => x);
        [1, true].some(x => x);
      `,
      errors: [
        { line: 1, messageId: MessageId.invalidType },
        { line: 2, messageId: MessageId.invalidType }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        [1].every(x => x);
        [""].every(x => x);
        [false].every(x => x);
        [1].every((x): true | undefined => x);
        [1].every((x): object | undefined => x);
        [1].every((x): symbol | undefined => x);
        [1].every((x): {} | undefined => x);
      `
    }
  ]
);
