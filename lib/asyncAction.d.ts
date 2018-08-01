import { Action } from "./action";
import { Reducer } from "./reducer";
export interface AsyncActionCreator<T> {
    (payload: any): (dispatch: any) => Promise<any>;
    reducer: Reducer<AsyncState<T>>;
    loading: Action;
    success: Action;
    failure: Action;
}
export interface AsyncState<T> {
    loading: boolean;
    error: string;
    data?: T;
}
export interface AsyncCb<T> {
    (payload: any, dispatch: any, getState: any): Promise<T>;
}
export declare function asyncState<T>(data?: T, loading?: boolean, error?: string): AsyncState<T>;
export declare function createAsyncAction<T>(type: string, mapToPayload?: (payload: any, dispatch: any, getState: any) => Promise<T>): AsyncActionCreator<T>;
