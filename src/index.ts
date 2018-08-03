import { Store, MapPayload } from "./redux"
import { isFn } from "./utils"
export { createAction } from "./action"
export { createReducer } from "./reducer"

export function reduxSauceMiddleware () {
  return ({ dispatch, getState }: Store) => (next: any) => (action: any) => {
    if (isFn(action)) return action(dispatch, getState)
    return next(action)
  }
}

export default reduxSauceMiddleware()
