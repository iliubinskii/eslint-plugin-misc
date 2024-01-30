import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";
import path from "node:path";
export var MessageId;
(function (MessageId) {
    MessageId["noSelfImport"] = "noSelfImport";
})(MessageId || (MessageId = {}));
export const noSelfImport = utils.createRule({
    name: "no-self-import",
    messages: { [MessageId.noSelfImport]: "Self-import is not allowed" },
    docs: {
        description: "Disallows self-import.",
        failExamples: `
      // filename: file.ts
      import { a } from "./file";
      import { b } from "./file.ts";
    `,
        passExamples: `
      // filename: file.ts
      import { a } from "@/file";
      import { b } from "@/file.ts";
    `
    },
    create: context => {
        const basename = context.stripExtension(path.basename(context.filename));
        return ruleTemplates.source(ctx => {
            const { node, source } = ctx;
            if (path.dirname(source) === "." &&
                context.stripExtension(path.basename(source)) === basename)
                context.report({ messageId: MessageId.noSelfImport, node });
        });
    }
});
//# sourceMappingURL=no-self-import.js.map