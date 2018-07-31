import { MapPayload } from "./redux";
import { Action } from "./action";
import { Reducer } from "./reducer";
interface AsyncActionCreator<T> {
    (payload: any): (dispatch: any) => Promise<any>;
    reducer: Reducer<AsyncState<T>>;
    loading: Action;
    success: Action;
    failure: Action;
}
interface AsyncState<T> {
    loading: boolean;
    error: string;
    data?: T;
}
export declare function createAsyncAction<T>(type: string, mapToPayload?: MapPayload<T>): AsyncActionCreator<T>;
export {};
