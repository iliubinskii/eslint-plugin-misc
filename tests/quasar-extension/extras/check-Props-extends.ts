import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/check-Props-extends"];

const MessageId = utils.getMessageId(rule);

utils.testRule("check-Props-extends", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface Props extends I {}
      interface Props extends I, PluginProps {}
      interface Props extends ParentProps, I {}
      interface Props extends I, PluginProps, OwnProps {}
      interface Props extends ParentProps, I, OwnProps {}
      interface Props extends ParentProps, PluginProps, I {}
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage },
      { line: 5, messageId: MessageId.customMessage },
      { line: 6, messageId: MessageId.customMessage }
    ]
  }
]);
