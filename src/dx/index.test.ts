import composeDeltas from "./"
import { createStore } from "redux"
import { toggleΔ } from "./toggle"
import { asyncΔ } from "./async"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Composer", () => {
      const activeAsyncΔ = composeDeltas(toggleΔ, asyncΔ)
      const user = activeAsyncΔ("user", { active: true })
      const store = createStore(user)

      it("Should have initial active", () => {
        expect(store.getState()).toEqual({
          active: true,
          loading: false,
          data: null,
          error: ""
        })
      })

      it("Should set active false", () => {
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
