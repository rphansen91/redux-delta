import { MapPayload } from "../redux"
import { createAction as ca, ActionCreator, Case } from "../action"
import { createReducer as cr, Reducer } from "../reducer"

export interface State<S> {
  [name: string]: S
}

export default class DeltaX<T> {
  private actions: { [name: string]: ActionCreator<any> } = {}
  name: string = ""

  constructor(name: string) {
    this.name = name
  }

  getCases (): Case[] {
    return []
  }

  createAction<t> (name: string, fn: MapPayload<t> = (v => v)): ActionCreator<t> {
    if (this.actions[name]) throw new Error(`"${name}" already created on reducer "${this.name}"`)
    const action: ActionCreator<t> = ca(name, fn);
    this.actions[name] = action
    return action
  }

  createReducer (initial: T): State<Reducer<T>> {
    return {
      [this.name]: cr(initial, this.getCases())
    }
  }

  mapper (state: State<T>): T {
    return state && state[this.name]
  }
}
