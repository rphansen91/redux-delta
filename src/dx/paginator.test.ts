import composeDeltas from "./"
import { createStore } from "redux"
import { asyncDelta } from "./async"
import { paginatorDelta, PaginateState } from "./paginator"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Paginator", () => {
      const pageasyncΔ = composeDeltas(asyncDelta, paginatorDelta)
      const user = pageasyncΔ("paginator")
      const store = createStore(user)

      it("Should create a paginator delta", () => {
        expect(typeof user).toBe("function")
        expect(typeof user.setLoading).toBe("function")
        expect(typeof user.setFailure).toBe("function")
        expect(typeof user.setSuccess).toBe("function")
        expect(typeof user.setNextPage).toBe("function")
        expect(typeof user.setMaxPages).toBe("function")
        expect(typeof user.setPage).toBe("function")
      })

      it("Should initialize a paginator delta page 4", () => {
        const p = paginatorDelta("paginator", { page: 4 })
        const s = createStore(p)
        expect(s.getState()).toEqual({
          page: 4
        })
      })

      it("Should initialize a paginator delta page 4", () => {
        const p = pageasyncΔ("paginator", { page: 4 })
        const s = createStore(p)
        expect(s.getState()).toEqual({
          page: 4,
          loading: false,
          data: null,
          error: ""
        })
      })

      it("Should set maxPages", () => {
        store.dispatch(user.setMaxPages(10))
        const { maxPages } = store.getState()
        expect(maxPages).toBe(10)
      })

      it("Should set nextPage", () => {
        store.dispatch(user.setNextPage("http://google.com/page/1"))
        const { nextPage } = store.getState()
        expect(nextPage).toBe("http://google.com/page/1")
      })

      it("Should set page", () => {
        store.dispatch(user.setPage(1))
        const { page } = store.getState()
        expect(page).toBe(1)
      })
    })
  })
})
