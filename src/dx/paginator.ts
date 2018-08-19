import { Delta } from "./index"
import { toActionName } from "../utils"
import { createAction, ActionCreator } from "../action"
import { createReducer, Reducer } from "../reducer"

interface PaginatorΔ extends Delta<PaginateState> {
  setNextPage: ActionCreator<string>
  setMaxPages: ActionCreator<number>
  setPage: ActionCreator<number>
}
export class PaginateState {
  nextPage?: string
  maxPages?: number
  page?: number
}

export function paginatorDelta(
  name: string,
  initial: PaginateState = new PaginateState()
): PaginatorΔ {
  const setNextPage = createAction<string>(toActionName(name, "setNextPage"))
  const setMaxPages = createAction<number>(toActionName(name, "setMaxPages"))
  const setPage = createAction<number>(toActionName(name, "setPage"))
  const reducer: any = createReducer(initial, [
    setNextPage.case((_, nextPage: string) => ({ nextPage })),
    setMaxPages.case((_, maxPages: number) => ({ maxPages })),
    setPage.case((_, page: number) => ({ page }))
  ])
  reducer.setNextPage = setNextPage
  reducer.setMaxPages = setMaxPages
  reducer.setPage = setPage
  return reducer as PaginatorΔ
}
