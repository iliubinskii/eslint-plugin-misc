import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/require-object-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-object-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      is.object.factory();
      is.object.factory<T>();
      is.object.of();
      is.object.of<T>();
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);
