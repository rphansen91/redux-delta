import { Store } from "./redux";
export { createAction } from "./action";
export { createReducer } from "./reducer";
export { createAsyncAction } from "./asyncAction";
export declare function reduxSauceMiddleware(): ({ dispatch, getState }: Store) => (next: any) => (action: any) => any;
declare const _default: ({ dispatch, getState }: Store) => (next: any) => (action: any) => any;
export default _default;
