import { createStore, combineReducers } from "redux"
import { Async } from "./async"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Async", () => {
      const name = "async"
      const async = new Async(name)
      const store = createStore(combineReducers(async.createReducer()))

      it("Should create an async delta", () => {
        expect(async).toBeInstanceOf(Async)
      })

      it("Should be able to set the loading state true", () => {
        store.dispatch(async.setLoading(true))
        const { loading } = async.mapper(store.getState())
        expect(loading).toBeTruthy()
      })

      it("Should be able to set the loading state false", () => {
        store.dispatch(async.setLoading(false))
        const { loading } = async.mapper(store.getState())
        expect(loading).toBeFalsy()
      })

      it("Should be able to set error state", () => {
        store.dispatch(async.setFailure("Reference error"))
        const { error } = async.mapper(store.getState())
        expect(error).toBe("Reference error")
      })

      it("Should be able to set error state empty", () => {
        store.dispatch(async.setFailure(""))
        const { error } = async.mapper(store.getState())
        expect(error).toBe("")
      })

      it("Should be able to set data", () => {
        const d = { a: 1, b: 2 }
        store.dispatch(async.setSuccess(d))
        const { data } = async.mapper(store.getState())
        expect(data).toBe(d)
      })
    })
  })
})
