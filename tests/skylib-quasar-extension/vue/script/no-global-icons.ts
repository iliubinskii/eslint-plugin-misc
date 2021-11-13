import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/script/no-global-icons"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-global-icons",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: 'import { icons } from "@skylib/facades";',
      errors: [{ line: 1, messageId: MessageId.customMessage }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: 'import type { icons } from "@skylib/facades";'
    }
  ]
);
