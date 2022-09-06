import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/object/no-get"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-get",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "wrapProxyHandler({ get: () => o.get() });",
      errors: [{ line: 1, messageId: MessageId.customMessage }]
    }
  ],
  [{ name: `Test at line ${getCurrentLine().line}`, code: "o.get();" }]
);
