import { MapPayload } from "./redux";
export interface Action {
    type: string;
    payload?: any;
}
export interface IsType {
    (t: string): boolean;
}
export interface Exec {
    (state: any, payload: any): any;
}
export interface Case {
    exec(state: any, payload: any): any;
    isType(type: string): boolean;
}
export interface ActionCreator {
    (payload: any): Action;
    type: string;
    isType(type: string): boolean;
    case: (mapToUpdate: (state: any, payload: any) => any) => Case;
}
export declare function createAction<T>(type: string, mapToPayload?: MapPayload<T>): ActionCreator;
