import DeltaX, { State } from "./index"
import { toActionName } from "../utils"
import { Reducer } from "../reducer"
import { ActionCreator } from "../action"

export class AsyncState<D> {
  loading: boolean = false
  error: string = ''
  data: D|null = null
}

export class Async<D> extends DeltaX<AsyncState<D>> {
  setLoading: ActionCreator<boolean>
  setFailure: ActionCreator<string>
  setSuccess: ActionCreator<D>

  constructor (name: string) {
    super(name)
    this.setLoading = this.createAction(toActionName(name, "loading"))
    this.setSuccess = this.createAction(toActionName(name, "success"))
    this.setFailure = this.createAction(toActionName(name, "failure"))
  }

  createReducer (initial: AsyncState<D> = new AsyncState()): State<Reducer<AsyncState<D>>> {
    return super.createReducer(initial)
  }

  mapper (state: State<AsyncState<D>>): AsyncState<D> {
    return super.mapper(state)
  }

  getCases () {
    return [
      this.setLoading.case((_, loading: boolean) => ({ loading: !!loading })),
      this.setFailure.case((_, error: string) => ({ error })),
      this.setSuccess.case((_, data?: D) => ({ data }))
    ]
  }
}
