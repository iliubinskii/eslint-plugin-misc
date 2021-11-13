import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/consistent-array-type-name"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-array-type-name", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type Cat = string[];
      type CatArray = string[];
      type Cats = string[];
      type Progress = string[];
      type ProgressArray = string[];
      type Progresses = string[];
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type Cat = readonly string[];
      type CatArray = readonly string[];
      type Cats = readonly string[];
      type Progress = readonly string[];
      type ProgressArray = readonly string[];
      type Progresses = readonly string[];
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  }
]);
