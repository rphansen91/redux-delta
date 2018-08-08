import reduxDelta, { createAction, createReducer } from "./"

describe("Redux Delta", () => {
  describe("Middleware", () => {
    it("`reduxDelta` should be a function", () => {
      expect(typeof reduxDelta).toBe("function")
    })

    it("`reduxDelta` is a replacement for redux-thunk", () => {
      const dispatch = jest.fn()
      const getState = jest.fn()
      const next = jest.fn(v => v)
      const action = jest.fn(() => "Δ")
      const result = reduxDelta({ dispatch, getState })(next)(action)
      expect(action).toBeCalledWith(dispatch, getState)
      expect(next).not.toBeCalled()
      expect(result).toBe("Δ")
    })

    it("`reduxDelta` is a replacement for redux-thunk", () => {
      const dispatch = jest.fn()
      const getState = jest.fn()
      const next = jest.fn(v => v)
      const action = {}
      const result = reduxDelta({ dispatch, getState })(next)(action)
      expect(next).toBeCalledWith(action)
      expect(result).toBe(action)
    })
  })
})
