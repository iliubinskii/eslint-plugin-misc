import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/check-Slots-extends"];

const MessageId = utils.getMessageId(rule);

utils.testRule("check-Slots-extends", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface Slots extends I {}
      interface Slots extends I, PluginSlots {}
      interface Slots extends ParentSlots, I {}
      interface Slots extends I, PluginSlots, OwnSlots {}
      interface Slots extends ParentSlots, I, OwnSlots {}
      interface Slots extends ParentSlots, PluginSlots, I {}
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
