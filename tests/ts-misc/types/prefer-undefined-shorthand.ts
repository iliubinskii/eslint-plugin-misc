import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["ts-misc/types/prefer-undefined-shorthand"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-undefined-shorthand", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type T3 = NumStr | undefined;
      type T2 = boolean | undefined;
      type T1 = true | undefined;
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);
