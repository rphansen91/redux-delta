import { MapPayload } from "../redux"
import { createAction, ActionCreator, Action } from "../action"
import { Reducer } from "../reducer"

const initDelta = createAction("@@INIT_DELTA")
export interface Delta<T> extends Reducer<T> {
  [key: string]: ActionCreator<any>
}

export default function compose(
  ...deltasFns: ((name: string) => Delta<any>)[]
) {
  return function(name: string, initialState: any = {}): Delta<any> {
    const deltas = deltasFns.map(deltasFn => deltasFn(name))
    const initial = deltas
      .map(delta => delta(undefined, initDelta()))
      .concat(initialState)
      .reduce((acc, c) => (Object as any).assign(acc, c), {})

    const reducer: any = (state: any = initial, action: Action): any => {
      return deltas.reduce((acc, delta) => delta(acc, action), state)
    }

    deltas.reduce((acc, delta) => {
      for (let key in delta) {
        acc[key] = delta[key]
      }
      return acc
    }, reducer)

    return reducer
  }
}
