"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
const reducer_1 = require("./reducer");
function asyncState(data, loading = false, error = '') {
    return { loading, data, error };
}
exports.asyncState = asyncState;
function createAsyncAction(type, mapToPayload = (v => v)) {
    const loading = action_1.createAction(`${type}_LOADING`);
    const success = action_1.createAction(`${type}_SUCCESS`);
    const failure = action_1.createAction(`${type}_FAILURE`);
    const thunk = (payload) => (dispatch, getState) => {
        dispatch(loading(payload));
        return Promise.resolve()
            .then(() => mapToPayload(payload, dispatch, getState))
            .then(res => dispatch(success(res)))
            .catch(err => dispatch(failure(err)));
    };
    thunk.reducer = reducer_1.createReducer(asyncState(), [
        loading.case((_, payload) => asyncState(null, true)),
        success.case((_, data) => asyncState(data)),
        failure.case(({ data }, err) => asyncState(data, false, err.message))
    ]);
    thunk.loading = loading;
    thunk.success = success;
    thunk.failure = failure;
    return thunk;
}
exports.createAsyncAction = createAsyncAction;
