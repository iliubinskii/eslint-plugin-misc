// eslint-disable-next-line @skylib/no-at-sign-internal-import, @skylib/no-internal-modules -- Ok
import { Style, Target } from "@/misc/core/consistent-optional-props";
import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["consistent-optional-props"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "consistent-optional-props",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        class C {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
        class D {
          x?: any;
          y?: unknown;
        }
        class E {
          x: any;
          y: unknown;
        }
      `,
      errors: [
        { line: 3, messageId: MessageId.combined },
        { line: 4, messageId: MessageId.combined }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ classes: Style.optional }],
      code: `
        export default class {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
        class D {
          x?: any;
          y?: unknown;
        }
        class E {
          x: any;
          y: unknown;
        }
      `,
      errors: [
        { line: 2, messageId: MessageId.optional },
        { line: 4, messageId: MessageId.optional }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ classes: Style.undefined }],
      code: `
        const C = class {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        };
        class D {
          x?: any;
          y?: unknown;
        }
        class E {
          x: any;
          y: unknown;
        }
      `,
      errors: [
        { line: 2, messageId: MessageId.undefined },
        { line: 3, messageId: MessageId.undefined },
        { line: 7, messageId: MessageId.undefined },
        { line: 8, messageId: MessageId.undefined }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          overrides: [
            {
              _id: "id1",
              pattern: "^C$",
              style: Style.undefined,
              target: Target.classes
            },
            {
              _id: "id2",
              propertyPattern: "^x$",
              style: Style.undefined,
              target: Target.classes
            }
          ]
        }
      ],
      code: `
        class C {
          x?: string | undefined;
          y?: string | undefined;
        }
        class D {
          x?: string | undefined;
          y?: string | undefined;
        }
      `,
      errors: [
        { line: 2, messageId: MessageId.undefinedId, data: { _id: "id2" } },
        { line: 3, messageId: MessageId.undefinedId, data: { _id: "id1" } },
        { line: 6, messageId: MessageId.undefinedId, data: { _id: "id2" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        interface I {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
        interface J {
          x?: any;
          y?: unknown;
        }
        interface K {
          x: any;
          y: unknown;
        }
      `,
      errors: [
        { line: 3, messageId: MessageId.combined },
        { line: 4, messageId: MessageId.combined }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ interfaces: Style.optional }],
      code: `
        export interface I {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        }
        interface J {
          x?: any;
          y?: unknown;
        }
        interface K {
          x: any;
          y: unknown;
        }
      `,
      errors: [
        { line: 2, messageId: MessageId.optional },
        { line: 4, messageId: MessageId.optional }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ interfaces: Style.undefined }],
      code: `
        interface I {
          x?: string | undefined;
          y?: string;
          z: string | undefined;
        };
        interface J {
          x?: any;
          y?: unknown;
        }
        interface K {
          x: any;
          y: unknown;
        }
      `,
      errors: [
        { line: 2, messageId: MessageId.undefined },
        { line: 3, messageId: MessageId.undefined },
        { line: 7, messageId: MessageId.undefined },
        { line: 8, messageId: MessageId.undefined }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          overrides: [
            {
              _id: "id1",
              pattern: ["^I$"],
              style: Style.undefined,
              target: Target.interfaces
            },
            {
              _id: "id2",
              propertyPattern: ["^x$"],
              style: Style.undefined,
              target: Target.interfaces
            }
          ]
        }
      ],
      code: `
        interface I {
          x?: string | undefined;
          y?: string | undefined;
        }
        interface J {
          x?: string | undefined;
          y?: string | undefined;
        }
      `,
      errors: [
        { line: 2, messageId: MessageId.undefinedId, data: { _id: "id2" } },
        { line: 3, messageId: MessageId.undefinedId, data: { _id: "id1" } },
        { line: 6, messageId: MessageId.undefinedId, data: { _id: "id2" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          classes: Style.undefined,
          interfaces: Style.undefined,
          overrides: [
            { _id: "id1", propertyPattern: ["^x$"], style: Style.combined },
            { _id: "id2", propertyPattern: ["^y$"], style: Style.optional }
          ]
        }
      ],
      code: `
        interface I {
          x: string | undefined;
          y: string | undefined;
        }
      `,
      errors: [
        { line: 2, messageId: MessageId.combinedId, data: { _id: "id1" } },
        { line: 3, messageId: MessageId.optionalId, data: { _id: "id2" } }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        class C {
          [f()]: string | undefined;
        }
      `,
      errors: [{ line: 2, messageId: MessageId.combined }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        class C {
          x: string;
          f() {}
        }
        interface I {
          x: string;
          f();
        }
      `
    }
  ]
);
