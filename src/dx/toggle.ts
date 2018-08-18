import { Delta } from "./index"
import { toActionName } from "../utils"
import { createAction, ActionCreator } from "../action"
import { createReducer, Reducer } from "../reducer"

export interface ToggleΔ extends Delta<ToggleState> {
  setActive: ActionCreator<boolean>
  toggleActive: ActionCreator<void>
}

export class ToggleState {
  active: boolean = false
}

export function toggleΔ(
  name: string,
  initial: ToggleState = new ToggleState()
): ToggleΔ {
  const setActive = createAction<boolean>(toActionName(name, "setActive"))
  const toggleActive = createAction<boolean>(toActionName(name, "toggleActive"))
  const reducer: any = createReducer(initial, [
    setActive.case((_, active: boolean) => ({ active })),
    toggleActive.case(({ active }) => ({ active: !active }))
  ])
  reducer.setActive = setActive
  reducer.toggleActive = toggleActive
  return reducer
}
