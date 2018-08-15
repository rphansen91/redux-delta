import { createStore, combineReducers } from "redux"
import { Paginator, PaginateState } from "./paginator"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Paginator", () => {
      const name = "paginator"
      const paginator = new Paginator(name)
      const store = createStore(combineReducers(paginator.createReducer()))

      it("Should create a paginator delta", () => {
        expect(paginator).toBeInstanceOf(Paginator)
      })

      it("Should initialize a paginator delta page 4", () => {
        const s = createStore(combineReducers(paginator.createReducer({ page: 4, loading: false, data: null, error: "" })))
        expect(paginator.mapper(s.getState())).toEqual({ page: 4, loading: false, data: null, error: "" })
      })

      it("Should extend paginator delta", () => {
        expect(typeof paginator.setLoading).toBe("function")
        expect(typeof paginator.setFailure).toBe("function")
        expect(typeof paginator.setSuccess).toBe("function")
      })

      it("Should set maxPages", () => {
        store.dispatch(paginator.setMaxPages(10))
        const { maxPages } = paginator.mapper(store.getState())
        expect(maxPages).toBe(10)
      })

      it("Should set nextPage", () => {
        store.dispatch(paginator.setNextPage("http://google.com/page/1"))
        const { nextPage } = paginator.mapper(store.getState())
        expect(nextPage).toBe("http://google.com/page/1")
      })

      it("Should set page", () => {
        store.dispatch(paginator.setPage(1))
        const { page } = paginator.mapper(store.getState())
        expect(page).toBe(1)
      })
    })
  })
})
