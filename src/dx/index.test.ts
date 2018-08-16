import { createStore, combineReducers } from "redux"
import DeltaX from "./"

describe("Redux Delta", () => {
  describe("Higher Order Delta", () => {
    describe("Creator", () => {
      const name = "creator"
      const delta = new DeltaX(name)
      const store = createStore(combineReducers(delta.createReducer({})))

      it("Should create an async delta", () => {
        expect(delta).toBeInstanceOf(DeltaX)
      })

      it("Should be able to get cases", () => {
        const cases = delta.getCases()
        expect(cases).toEqual([])
      })

      it("Should be able to get state", () => {
        const state = delta.mapper(store.getState())
        expect(state).toEqual({})
      })

      it("Should throw an error if action already exists", () => {
        const actionName = "a"
        expect(typeof delta.createAction(actionName)).toBe("function")
        expect(() => delta.createAction(actionName, v => v)).toThrowError(
          `"${actionName}" already created on reducer "${name}"`
        )
      })
    })
  })
})
