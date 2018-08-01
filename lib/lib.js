"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
var action_1 = require("./action");
exports.createAction = action_1.createAction;
var reducer_1 = require("./reducer");
exports.createReducer = reducer_1.createReducer;
var asyncAction_1 = require("./asyncAction");
exports.createAsyncAction = asyncAction_1.createAsyncAction;
function reduxSauceMiddleware() {
    return ({ dispatch, getState }) => (next) => (action) => {
        if (utils_1.isFn(action))
            return action(dispatch, getState);
        return next(action);
    };
}
exports.reduxSauceMiddleware = reduxSauceMiddleware;
exports.default = reduxSauceMiddleware();
