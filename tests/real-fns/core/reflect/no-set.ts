import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/reflect/no-set"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-set",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "reflect.set();",
      errors: [{ line: 1, messageId: MessageId.customMessage }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "wrapProxyHandler({ set: () => reflect.set() });"
    }
  ]
);
