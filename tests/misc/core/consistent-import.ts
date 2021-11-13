import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["consistent-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "consistent-import",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id1",
              autoImport: true,
              autoImportSource: "source1",
              localName: "localName1",
              source: "source1"
            },
            {
              _id: "id2",
              autoImport: true,
              autoImportSource: "source2",
              localName: "localName2",
              source: "source2",
              wildcard: true
            },
            {
              _id: "id3",
              autoImport: true,
              autoImportSource: "source3",
              localName: "localName3",
              source: "source3",
              wildcard: true
            },
            {
              _id: "id4",
              autoImport: true,
              autoImportSource: "source4",
              localName: "localName4",
              source: "source4",
              wildcard: true
            },
            {
              _id: "id5",
              autoImport: true,
              autoImportSource: "source5",
              localName: "localName5",
              source: "source5",
              wildcard: true
            },
            {
              _id: "id6",
              autoImport: true,
              autoImportSource: "source6",
              localName: "localName6",
              source: "source6",
              wildcard: true
            },
            {
              _id: "id7",
              autoImport: true,
              autoImportSource: "source7",
              localName: "localName7",
              source: "source7",
              wildcard: true
            }
          ]
        }
      ],
      code: `
        localName1;
        localName1;

        localName2;
        localName2;

        const obj = {};

        obj.localName3;

        const localName4 = 1;

        function localName5() {}

        class localName6 {}

        namespace localName7 {}
      `,
      output: `
        import localName1 from "source1";
        import * as localName2 from "source2";
        localName1;
        localName1;

        localName2;
        localName2;

        const obj = {};

        obj.localName3;

        const localName4 = 1;

        function localName5() {}

        class localName6 {}

        namespace localName7 {}
      `,
      errors: [
        { line: 1, messageId: MessageId.autoImport },
        { line: 1, messageId: MessageId.autoImport },
        { line: 2, messageId: MessageId.autoImport },
        { line: 4, messageId: MessageId.autoImport },
        { line: 5, messageId: MessageId.autoImport }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              autoImport: true,
              autoImportSource: "@/source",
              localName: "source",
              source: "@skylib/eslint-plugin/src/source",
              wildcard: true
            }
          ]
        }
      ],
      code: "source;",
      output: `
        import * as source from "@/source";
        source;
      `,
      errors: [
        { line: 1, messageId: MessageId.autoImport },
        { line: 1, messageId: MessageId.autoImport }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              autoImport: true,
              autoImportSource: "@/source",
              localName: "source",
              source: "@skylib/eslint-plugin/src/source",
              wildcard: true
            }
          ]
        }
      ],
      code: "const x = { source };",
      output: `
        import * as source from "@/source";
        const x = { source };
      `,
      errors: [
        { line: 1, messageId: MessageId.autoImport },
        { line: 1, messageId: MessageId.autoImport }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id1",
              localName: "localName1",
              source: "source1",
              wildcard: true
            },
            {
              _id: "id2",
              localName: "localName2",
              source: "source2",
              wildcard: true
            },
            { _id: "id3", localName: "localName3", source: "source3" }
          ]
        }
      ],
      code: `
        import localName1 from "source1";
        import { localName2 } from "source2";
        import * as localName3 from "source3";
        import * as localName4 from "source4";
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardRequired,
          data: { _id: "id1", source: "source1" }
        },
        {
          line: 2,
          messageId: MessageId.wildcardRequired,
          data: { _id: "id2", source: "source2" }
        },
        {
          line: 3,
          messageId: MessageId.wildcardDisallowed,
          data: { _id: "id3", source: "source3" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            { _id: "id1", localName: "localName1", source: "source1" },
            {
              _id: "id2",
              localName: "localName2",
              source: "source2",
              wildcard: true
            }
          ]
        }
      ],
      code: `
        import wrongName1 from "source1";
        import * as wrongName2 from "source2";
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidLocalName,
          data: {
            _id: "id1",
            expectedLocalName: "localName1",
            source: "source1"
          }
        },
        {
          line: 2,
          messageId: MessageId.invalidLocalName,
          data: {
            _id: "id2",
            expectedLocalName: "localName2",
            source: "source2"
          }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id1",
              altLocalNames: ["altName1"],
              localName: "localName1",
              source: "source1"
            },
            {
              _id: "id2",
              altLocalNames: ["altName2"],
              localName: "localName2",
              source: "source2"
            },
            {
              _id: "id3",
              altLocalNames: ["altName3"],
              localName: "localName3",
              source: "source3"
            },
            {
              _id: "id4",
              altLocalNames: ["altName4"],
              localName: "localName4",
              source: "source4",
              wildcard: true
            },
            {
              _id: "id5",
              altLocalNames: ["altName5"],
              localName: "localName5",
              source: "source5",
              wildcard: true
            },
            {
              _id: "id6",
              altLocalNames: ["altName6"],
              localName: "localName6",
              source: "source6",
              wildcard: true
            }
          ]
        }
      ],
      code: `
        import wrongName1 from "source1";
        import localName2 from "source2";
        import altName3 from "source3";
        import * as wrongName4 from "source4";
        import * as localName5 from "source5";
        import * as altName6 from "source6";

        const localName1 = 1;
        const localName3 = 1;
        const localName4 = 1;
        const localName6 = 1;
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.invalidLocalName,
          data: { _id: "id1", expectedLocalName: "altName1", source: "source1" }
        },
        {
          line: 4,
          messageId: MessageId.invalidLocalName,
          data: { _id: "id4", expectedLocalName: "altName4", source: "source4" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            { _id: "id1", source: "source1" },
            { _id: "id2", source: "source2", wildcard: true },
            {
              _id: "id3",
              localName: "localName3",
              source: "source3",
              wildcard: true
            }
          ]
        }
      ],
      code: `
        export * as localName1 from "source1";
        export * as localName2 from "source2";
        export * as localName3 from "source3";
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardDisallowed,
          data: { _id: "id1", expectedLocalName: "source1", source: "source1" }
        },
        {
          line: 2,
          messageId: MessageId.invalidLocalName,
          data: { _id: "id2", expectedLocalName: "source2", source: "source2" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            { _id: "id1", source: "source1", wildcard: true },
            { _id: "id2", source: "source2" },
            { _id: "id3", localName: "localName3", source: "source3" }
          ]
        }
      ],
      code: `
        export { default as localName1 } from "source1";
        export { default as localName2 } from "source2";
        export { default as localName3 } from "source3";
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardRequired,
          data: { _id: "id1", expectedLocalName: "source1", source: "source1" }
        },
        {
          line: 2,
          messageId: MessageId.invalidLocalName,
          data: { _id: "id2", expectedLocalName: "source2", source: "source2" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id1",
              source: "@skylib/eslint-plugin/source1",
              wildcard: true
            },
            {
              _id: "id2",
              source: "@skylib/eslint-plugin/fixtures/source2",
              wildcard: true
            },
            { _id: "catch-all", source: "**", wildcard: true }
          ]
        }
      ],
      code: `
        import source1 from "../source1";
        import source2 from "./source2";
        import source3 from "./source3";
      `,
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardRequired,
          data: {
            _id: "id1",
            expectedLocalName: "source1",
            source: "@skylib/eslint-plugin/source1"
          }
        },
        {
          line: 2,
          messageId: MessageId.wildcardRequired,
          data: {
            _id: "id2",
            expectedLocalName: "source2",
            source: "@skylib/eslint-plugin/fixtures/source2"
          }
        },
        {
          line: 3,
          messageId: MessageId.wildcardRequired,
          data: {
            _id: "catch-all",
            expectedLocalName: "source3",
            source: "@skylib/eslint-plugin/fixtures/source3"
          }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ sources: [{ _id: "id", source: "source", wildcard: true }] }],
      code: 'import source from "source"',
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardRequired,
          data: { _id: "id", source: "source" }
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              filesToLint: ["./fixtures/file.ts"],
              filesToSkip: ["./fixtures/**", "./other/**"],
              source: "source",
              wildcard: true
            }
          ]
        }
      ],
      code: 'import source from "source"',
      errors: [
        {
          line: 1,
          messageId: MessageId.wildcardRequired,
          data: { _id: "id", source: "source" }
        }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            { _id: "id1", localName: "localName1", source: "source1" },
            {
              _id: "id2",
              localName: "localName2",
              source: "source2",
              wildcard: true
            }
          ]
        }
      ],
      code: `
        import localName1, { anyName1, anyName2 } from "source1";
        import * as localName2 from "source2";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id0",
              localName: "index",
              source: "@skylib/eslint-plugin",
              wildcard: true
            },
            {
              _id: "id1",
              source: "@skylib/eslint-plugin/src/source1",
              wildcard: true
            },
            {
              _id: "id2",
              source: "@skylib/eslint-plugin/fixtures/source2",
              wildcard: true
            },
            {
              _id: "id3",
              source: "@skylib/eslint-plugin/source3",
              wildcard: true
            }
          ]
        }
      ],
      code: `
        import * as index from "@";
        import * as source1 from "@/source2";
        import * as source2 from "./source3";
        import * as source3 from "../source4";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              source: "@skylib/eslint-plugin/src/some-source",
              wildcard: true
            }
          ]
        }
      ],
      code: 'import * as someSource from "@/some-source";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              source: "@skylib/eslint-plugin/fixtures",
              sourcePattern: "@skylib/*/fixtures",
              wildcard: true
            }
          ]
        }
      ],
      code: 'import * as fixtures from ".";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: 'import someName from "source";'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            { _id: "id1", source: "index.source1" },
            { _id: "id2", source: "index.source2", wildcard: true }
          ]
        }
      ],
      code: `
        export { source1 } from "index.source1";
        export * as source2 from "index.source2";
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              filesToSkip: ["./fixtures/**"],
              source: "source",
              wildcard: true
            }
          ]
        }
      ],
      code: 'import source from "source"'
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          sources: [
            {
              _id: "id",
              filesToLint: ["./other/**"],
              source: "source",
              wildcard: true
            }
          ]
        }
      ],
      code: 'import source from "source"'
    }
  ]
);
