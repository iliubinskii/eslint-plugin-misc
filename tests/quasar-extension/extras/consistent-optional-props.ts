import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/consistent-optional-props"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-optional-props", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface Props {
        click: string | undefined;
        onClick: Function | undefined
      }
    `,
    errors: [
      { line: 2, messageId: MessageId.combinedId, data: { _id: "Props" } },
      { line: 3, messageId: MessageId.optionalId, data: { _id: "Props.event" } }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface Slots {
        click: string | undefined;
        onClick: Function | undefined
      }
    `,
    errors: [
      { line: 2, messageId: MessageId.combinedId, data: { _id: "Slots" } },
      { line: 3, messageId: MessageId.optionalId, data: { _id: "Slots.event" } }
    ]
  }
]);
