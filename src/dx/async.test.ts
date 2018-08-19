import { createStore } from "redux"
import { asyncDelta } from "./async"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Async", () => {
      const name = "profile"
      const profile = asyncDelta<{ name: string; image: string }>(name)
      const store = createStore(profile)

      it("Should create an async delta", () => {
        expect(typeof profile).toBe("function")
        expect(typeof profile.setLoading).toBe("function")
        expect(typeof profile.setFailure).toBe("function")
        expect(typeof profile.setSuccess).toBe("function")
      })

      it("Should be able to set the loading state true", () => {
        store.dispatch(profile.setLoading(true))
        const { loading } = store.getState()
        expect(loading).toBeTruthy()
      })

      it("Should be able to set the loading state false", () => {
        store.dispatch(profile.setLoading(false))
        const { loading } = store.getState()
        expect(loading).toBeFalsy()
      })

      it("Should be able to set error state", () => {
        store.dispatch(profile.setFailure("Reference error"))
        const { error } = store.getState()
        expect(error).toBe("Reference error")
      })

      it("Should be able to set error state empty", () => {
        store.dispatch(profile.setFailure(""))
        const { error } = store.getState()
        expect(error).toBe("")
      })

      it("Should be able to set data", () => {
        const d = { name: "Ryan", image: "http://placehold.it/300x300" }
        store.dispatch(profile.setSuccess(d))
        const { data } = store.getState()
        expect(data).toBe(d)
      })

      it("Should be able initialize with loading true", () => {
        const a = asyncDelta(name, {
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
