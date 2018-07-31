import { isFn } from "./utils"
import { Action, Case } from "./action"

export interface ReducerCreator<T> {
  (initial: T, actionCases: Array<Case>): Reducer<T>
}

export interface Reducer<T> {
  (state: T, action: Action): T
}

const isValidCase = (c: Case): boolean => c && isFn(c.isType) && isFn(c.exec);

export function createReducer<T> (
  initialState: T,
  actionCases: Array<Case>,
  {
    breakCase=false,
    mergeState=(<any>Object).assign
  } = {}
): Reducer<T> {
  const empty: Array<Case> = []
  const validCases = empty.concat(actionCases).filter(isValidCase)

  return (state: T = initialState, action: Action = { type: "" }): T => {
    if (breakCase) {
      // HANDLE ONLY FIRST CASE
      for (const i in validCases) {
        if (validCases[i]) {
          const { isType, exec } = validCases[i];
          if (isType(action.type)) return mergeState({}, state, exec(state, action.payload));
        }
      }
      return state
    } else {
      // HANDLE ALL CASES
      return validCases.reduce((acc, { isType, exec }) =>
        (isType(action.type))
        ? mergeState({}, acc, exec(state, action.payload))
        : acc
      , mergeState({}, state))
    }
  }
}
