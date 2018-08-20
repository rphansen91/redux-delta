import { createStore } from "redux"
import { ActionCreator, createAction } from "./action"
import { Reducer, createReducer } from "./reducer"

const noop = createAction("NOOP")
const inc = createAction("INC") as ActionCreator<number>
const dec = createAction("DEC") as ActionCreator<number>

const counter: Reducer<{ count: number }> = createReducer({ count: 0 }, [
  inc.case(({ count }, v = 1) => ({ count: count + v })),
  dec.case(({ count }, v = 1) => ({ count: count - v }))
])

const dupecounter: Reducer<{ count: number }> = createReducer({ count: 0 }, [
  inc.case(({ count }, v = 1) => ({ count: count + v })),
  inc.case(({ count }, v = 1) => ({ count: count + v })),
  dec.case(({ count }, v = 1) => ({ count: count - v }))
])

describe("Redux Delta", () => {
  describe("Reducer", () => {
    it("`createReducer` should be a function", () => {
      expect(typeof createReducer).toBe("function")
    })

    it("Should create a counter", () => {
      const store = createStore(counter)
      store.dispatch(noop())
      expect(store.getState()).toEqual({ count: 0 })
      store.dispatch(inc(1))
      expect(store.getState()).toEqual({ count: 1 })
      store.dispatch(inc(1))
      expect(store.getState()).toEqual({ count: 2 })
      store.dispatch(dec(9))
      expect(store.getState()).toEqual({ count: -7 })
    })

    it("Should handle an action twice", () => {
      const counter: any = createReducer({ count: 0 }, [
        inc.case(({ count }, v = 1) => ({ count: count + v })),
        inc.case(({ count }, v = 1) => ({ count: count + v }))
      ])
      const store = createStore(counter)
      store.dispatch(inc(1))
      expect(store.getState()).toEqual({ count: 2 })
    })

    it("Should break after first case", () => {
      const counter: any = createReducer(
        { count: 0 },
        [
          inc.case(({ count }, v = 1) => ({ count: count + v })),
          inc.case(({ count }, v = 1) => ({ count: count + v }))
        ],
        { breakCase: true }
      )
      const store = createStore(counter)
      store.dispatch(inc(1))
      expect(store.getState()).toEqual({ count: 1 })
    })

    it("Should be able to supply merge method", () => {
      const mergeState = jest.fn((...args) => Object.assign({}, ...args))
      const counter: any = createReducer(
        { count: 0 },
        [inc.case(({ count }, v = 1) => ({ count: count + v }))],
        { mergeState }
      )
      const store = createStore(counter)
      store.dispatch(inc(1))
      expect(store.getState()).toEqual({ count: 1 })
      expect(mergeState).toBeCalledWith({}, { count: 0 })
      expect(mergeState).toBeCalledWith({}, { count: 0 }, { count: 1 })
    })

    it("Should be able to handle null method", () => {
      const reducer = createReducer({ count: 0 }, [
        inc.case(({ count }, v = 1) => ({ count: count + v })),
        inc.case(({ count }, v = 1) => ({ count: count + v }))
      ])
      expect(reducer({ count: 0 })).toEqual({ count: 0 })
    })

    it("Should be able to handle null method -- breakCase", () => {
      const reducer = createReducer(
        { count: 0 },
        [
          inc.case(({ count }, v = 1) => ({ count: count + v })),
          inc.case(({ count }, v = 1) => ({ count: count + v }))
        ],
        { breakCase: true }
      )
      expect(reducer({ count: 0 })).toEqual({ count: 0 })
    })
  })
})
