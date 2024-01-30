import * as _ from "lodash-commonjs-es";
import * as utils from "../../utils";
export var MessageId;
(function (MessageId) {
    MessageId["multiTypeTuple"] = "multiTypeTuple";
})(MessageId || (MessageId = {}));
export const noMultiTypeTuples = utils.createRule({
    name: "no-multi-type-tuples",
    messages: { [MessageId.multiTypeTuple]: "Multi-type tuples are not allowed" },
    docs: {
        description: "Disallows multi-type tuples.",
        failExamples: "type T = [string, number];",
        passExamples: "type T = [string, string];"
    },
    create: (context) => ({
        TSTupleType: node => {
            if (_.uniq(node.elementTypes.map(context.getText)).length > 1)
                context.report({ messageId: MessageId.multiTypeTuple, node });
        }
    })
});
//# sourceMappingURL=no-multi-type-tuples.js.map