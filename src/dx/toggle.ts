import DeltaX, { State } from "./index"
import { Async, AsyncState } from "./async"
import { toActionName } from "../utils"
import { createAction as ca, ActionCreator } from "../action"
import { createReducer as cr, Reducer } from "../reducer";

export class ToggleState {
  active: boolean = false
}

export class Toggle extends DeltaX<ToggleState> {
  setActive: ActionCreator<boolean>
  toggleActive: ActionCreator<void>

  constructor (name: string) {
    super(name)
    this.setActive = this.createAction(toActionName("setActive", name))
    this.toggleActive = this.createAction(toActionName("toggleActive", name))
  }

  createReducer (initial: ToggleState = new ToggleState()): State<Reducer<ToggleState>> {
    return super.createReducer(initial)
  }

  mapper (state: State<ToggleState>): ToggleState {
    return super.mapper(state)
  }

  getCases () {
    return super.getCases()
    .concat([
      this.setActive.case((_, active: boolean) => ({ active })),
      this.toggleActive.case(({ active }) => ({ active: !active })),
    ])
  }
}
