import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["sort-top-comments"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-top-comments", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <script lang="ts">
      // Comment 5
      // Comment 4
      /* Comment 3 */
      /* Comment 2 */
      function f() {
        /* Comment 5 */
        /* Comment 4 */
      }
      /* Comment 1 */
      </script>
    `,
    output: `
      <script lang="ts">
      /* Comment 2 */
      /* Comment 3 */
      // Comment 4
      // Comment 5
      function f() {
        /* Comment 5 */
        /* Comment 4 */
      }
      /* Comment 1 */
      </script>
    `,
    errors: [{ line: 2, endLine: 5, messageId: MessageId.incorrectSorting }]
  }
]);
