/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../utils";
import { core } from "../core";
export const preferIndexedObject = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "IndexedObject" type instead',
            selector: "TSTypeReference[typeName.name=Rec] > TSTypeParameterInstantiation > TSTypeReference:first-child > Identifier.typeName[name=PropertyKey]"
        }
    ]
});
//# sourceMappingURL=prefer-IndexedObject.js.map