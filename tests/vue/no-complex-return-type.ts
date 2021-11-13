import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["vue/no-complex-return-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-complex-return-type", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f() { return { x: 1 } }
      function g(): object { return { x: 1 } }
      interface I { (): unknown; }
      class C {
        public constructor() {}
        *f(): IterableIterator<string[]> {}
      }
      export default defineComponent({ setup: () => ({ x: 1 }) });
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
