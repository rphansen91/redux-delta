"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const isValidCase = (c) => c && utils_1.isFn(c.isType) && utils_1.isFn(c.exec);
function createReducer(initialState, actionCases, { breakCase = false, mergeState = Object.assign } = {}) {
    const empty = [];
    const validCases = empty.concat(actionCases).filter(isValidCase);
    return (state = initialState, action = { type: "" }) => {
        if (breakCase) {
            // HANDLE ONLY FIRST CASE
            for (const i in validCases) {
                if (validCases[i]) {
                    const { isType, exec } = validCases[i];
                    if (isType(action.type))
                        return mergeState({}, state, exec(state, action.payload));
                }
            }
            return state;
        }
        else {
            // HANDLE ALL CASES
            return validCases.reduce((acc, { isType, exec }) => (isType(action.type))
                ? mergeState({}, acc, exec(state, action.payload))
                : acc, mergeState({}, state));
        }
    };
}
exports.createReducer = createReducer;
