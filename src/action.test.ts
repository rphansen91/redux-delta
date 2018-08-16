import { createAction } from "./"

describe("Redux Delta", () => {
  describe("Action", () => {
    it("`createAction` should be a function", () => {
      expect(typeof createAction).toBe("function")
    })

    it("Should create an action creator", () => {
      const type = "ABC"
      const payload = "123"
      const action = createAction(type)
      const a = action(payload)
      expect(action.type).toBe(type)
      expect(a.type).toBe(type)
      expect(a.payload).toBe(payload)
    })

    it("Should validate if an action is a type", () => {
      const type = "ABC"
      const action1 = createAction(type)
      const action2 = createAction(type)()
      expect(action1.isType(action2.type)).toBeTruthy()
    })

    it("Should validate if an action is not a type", () => {
      const action1 = createAction("ABC")
      const action2 = createAction("XYZ")()
      expect(action1.isType(action2.type)).toBeFalsy()
    })

    it("Should create a case statement", () => {
      const state = {}
      const type = "ABC"
      const payload = "123"
      const fn = jest.fn((a, b) => [a, b])
      const action = createAction(type)
      const { isType, exec } = action.case(fn)
      const result = exec(state, payload)
      expect(isType(type)).toBeTruthy()
      expect(result).toEqual([state, payload])
    })

    it("Should return payload when no function supplied", () => {
      const state = {}
      const type = "ABC"
      const payload = "123"
      const action = createAction(type)
      const { isType, exec } = action.case()
      const result = exec(state, payload)
      expect(isType(type)).toBeTruthy()
      expect(result).toEqual(payload)
    })
  })
})
