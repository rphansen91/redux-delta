import { Action, Case } from "./action";
export interface ReducerCreator<T> {
    (initial: T, actionCases: Array<Case>): Reducer<T>;
}
export interface Reducer<T> {
    (state: T, action: Action): T;
}
export declare function createReducer<T>(initialState: T, actionCases: Array<Case>, { breakCase, mergeState }?: {
    breakCase?: boolean;
    mergeState?: any;
}): Reducer<T>;
