import { createStore } from "redux"
import { asyncΔ } from "./async"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Async", () => {
      const name = "async"
      const async = asyncΔ<{ a: number; b: number }>(name)
      const store = createStore(async)

      it("Should create an async delta", () => {
        expect(typeof async).toBe("function")
        expect(typeof async.setLoading).toBe("function")
        expect(typeof async.setFailure).toBe("function")
        expect(typeof async.setSuccess).toBe("function")
      })

      it("Should be able to set the loading state true", () => {
        store.dispatch(async.setLoading(true))
        const { loading } = store.getState()
        expect(loading).toBeTruthy()
      })

      it("Should be able to set the loading state false", () => {
        store.dispatch(async.setLoading(false))
        const { loading } = store.getState()
        expect(loading).toBeFalsy()
      })

      it("Should be able to set error state", () => {
        store.dispatch(async.setFailure("Reference error"))
        const { error } = store.getState()
        expect(error).toBe("Reference error")
      })

      it("Should be able to set error state empty", () => {
        store.dispatch(async.setFailure(""))
        const { error } = store.getState()
        expect(error).toBe("")
      })

      it("Should be able to set data", () => {
        const d = { a: 1, b: 2 }
        store.dispatch(async.setSuccess(d))
        const { data } = store.getState()
        expect(data).toBe(d)
      })

      it("Should be able initialize with loading true", () => {
        const a = asyncΔ(name, {
          loading: true,
          data: null,
          error: ""
        })
        const s = createStore(a)
        const { loading } = s.getState()
        expect(loading).toBeTruthy()
      })
    })
  })
})
