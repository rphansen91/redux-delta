import { createStore, combineReducers } from "redux"
import { Toggle } from "./toggle"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Toggle", () => {
      const name = "toggle"
      const toggle = new Toggle(name)
      const store = createStore(combineReducers(toggle.createReducer()))

      it("Should create a toggle delta", () => {
        expect(toggle).toBeInstanceOf(Toggle)
      })

      it("Should initialize a toggle delta active true", () => {
        const s = createStore(combineReducers(toggle.createReducer({ active: true })))
        expect(toggle.mapper(s.getState())).toEqual({ active: true })
      })

      it("Should default active state false", () => {
        expect(toggle.mapper(store.getState())).toEqual({ active: false })
      })

      it("Should be able to set the active state true", () => {
        store.dispatch(toggle.setActive(true))
        expect(toggle.mapper(store.getState())).toEqual({ active: true })
      })

      it("Should be able to set the active state false", () => {
        store.dispatch(toggle.setActive(false))
        expect(toggle.mapper(store.getState())).toEqual({ active: false })
      })

      it("Should be able to toggle the active state", () => {
        store.dispatch(toggle.toggleActive())
        expect(toggle.mapper(store.getState())).toEqual({ active: true })
        store.dispatch(toggle.toggleActive())
        expect(toggle.mapper(store.getState())).toEqual({ active: false })
      })
    })
  })
})
