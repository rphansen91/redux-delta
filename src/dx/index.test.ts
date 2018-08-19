import composeDeltas from "./"
import { createStore } from "redux"
import { toggleDelta } from "./toggle"
import { asyncDelta } from "./async"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Composer", () => {
      it("Initially should be active false", () => {
        const activeAsyncΔ = composeDeltas(toggleDelta, asyncDelta)
        const user = activeAsyncΔ("user")
        const store = createStore(user)
        expect(store.getState()).toEqual({
          active: false,
          loading: false,
          data: null,
          error: ""
        })
      })

      it("Initially should be active true", () => {
        const activeAsyncΔ = composeDeltas(toggleDelta, asyncDelta)
        const user = activeAsyncΔ("user", { active: true })
        const store = createStore(user)
        expect(store.getState()).toEqual({
          active: true,
          loading: false,
          data: null,
          error: ""
        })
      })

      it("Should set active false", () => {
        const activeAsyncΔ = composeDeltas(toggleDelta, asyncDelta)
        const user = activeAsyncΔ("user", { active: true })
        const store = createStore(user)
        store.dispatch(user.setActive(false))
        expect(store.getState()).toEqual({
          active: false,
          loading: false,
          data: null,
          error: ""
        })
      })
    })
  })
})
