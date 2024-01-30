import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["sort-top-comments"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-top-comments", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      // Comment 5
      // Comment 4
      /* Comment 3 */
      /* Comment 2 */
      function f() {
        /* Comment 5 */
        /* Comment 4 */
      }
      /* Comment 1 */
    `,
    output: `
      /* Comment 2 */
      /* Comment 3 */
      // Comment 4
      // Comment 5
      function f() {
        /* Comment 5 */
        /* Comment 4 */
      }
      /* Comment 1 */
    `,
    errors: [{ line: 1, endLine: 4, messageId: MessageId.incorrectSorting }]
  }
]);
