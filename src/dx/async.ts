import { Delta } from "./index"
import { toActionName } from "../utils"
import { createReducer, Reducer } from "../reducer"
import { createAction, ActionCreator } from "../action"

export interface AsyncΔ<D> extends Delta<AsyncState<D>> {
  setLoading: ActionCreator<boolean>
  setFailure: ActionCreator<string>
  setSuccess: ActionCreator<D>
}

export class AsyncState<D> {
  loading: boolean = false
  error: string = ""
  data: D | null = null
}

export function asyncDelta<D>(
  name: string,
  initial: AsyncState<D> = new AsyncState()
): AsyncΔ<D> {
  const setLoading = createAction<boolean>(toActionName(name, "setLoading"))
  const setSuccess = createAction<D | null>(toActionName(name, "setSuccess"))
  const setFailure = createAction<string>(toActionName(name, "setFailure"))
  const reducer: any = createReducer(initial, [
    setLoading.case((_, loading: boolean) => ({ loading: !!loading })),
    setSuccess.case((_, data: D | null) => ({ data })),
    setFailure.case((_, error: string) => ({ error }))
  ])
  reducer.setLoading = setLoading
  reducer.setSuccess = setSuccess
  reducer.setFailure = setFailure
  return reducer as AsyncΔ<D>
}
