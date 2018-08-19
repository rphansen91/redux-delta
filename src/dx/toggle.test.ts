import { createStore } from "redux"
import { toggleDelta } from "./toggle"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Toggle", () => {
      const toggle = toggleDelta("toggle")
      const store = createStore(toggle)

      it("Should create a toggle delta", () => {
        expect(typeof toggle).toBe("function")
      })

      it("Should initialize a toggle delta active true", () => {
        const t = toggleDelta("toggle", { active: true })
        const s = createStore(t)
        expect(s.getState()).toEqual({ active: true })
      })

      it("Should default active state false", () => {
        expect(store.getState()).toEqual({ active: false })
      })

      it("Should be able to set the active state true", () => {
        store.dispatch(toggle.setActive(true))
        expect(store.getState()).toEqual({ active: true })
      })

      it("Should be able to set the active state false", () => {
        store.dispatch(toggle.setActive(false))
        expect(store.getState()).toEqual({ active: false })
      })

      it("Should be able to toggle the active state", () => {
        store.dispatch(toggle.toggleActive())
        expect(store.getState()).toEqual({ active: true })
        store.dispatch(toggle.toggleActive())
        expect(store.getState()).toEqual({ active: false })
      })
    })
  })
})
