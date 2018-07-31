"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function createAction(type, mapToPayload = (v => v)) {
    const isType = (t) => t === type;
    const builder = (payload) => ({
        type,
        payload: mapToPayload(payload)
    });
    builder.case = (mapToUpdate) => {
        // if (!isFn(mapToUpdate)) throw new Error(`No callback supplied for case: "${type}"`)
        if (!utils_1.isFn(mapToUpdate))
            return {
                exec: (s, p) => p,
                isType: () => false
            };
        return {
            exec: (s, p) => mapToUpdate(s, p),
            isType
        };
    };
    builder.type = type;
    builder.isType = isType;
    return builder;
}
exports.createAction = createAction;
