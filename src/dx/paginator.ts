import DeltaX, { State } from "./index"
import { Async, AsyncState } from "./async"
import { toActionName } from "../utils"
import { createAction as ca, ActionCreator } from "../action"
import { createReducer as cr, Reducer } from "../reducer";

export class PaginateState<D> extends AsyncState<D> {
  nextPage?: string
  maxPages?: number
  page?: number
}

export class Paginator<D> extends Async<D> {
  setNextPage: ActionCreator<string>
  setMaxPages: ActionCreator<number>
  setPage: ActionCreator<number>

  /* istanbul ignore next */
  constructor (name: string) {
    super(name)
    this.setNextPage = this.createAction(toActionName("setNextPage", name))
    this.setMaxPages = this.createAction(toActionName("setMaxPages", name))
    this.setPage = this.createAction(toActionName("setPage", name))
  }

  createReducer (initial: PaginateState<D> = new PaginateState()): State<Reducer<PaginateState<D>>> {
    return super.createReducer(initial)
  }

  mapper (state: State<PaginateState<D>>): PaginateState<D> {
    return super.mapper(state)
  }

  getCases () {
    return super.getCases()
    .concat([
      this.setNextPage.case((_, nextPage: string) => ({ nextPage })),
      this.setMaxPages.case((_, maxPages: number) => ({ maxPages })),
      this.setPage.case((_, page: number) => ({ page }))
    ])
  }
}
