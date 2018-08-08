import { createStore } from "redux"
import { createAction, createReducer } from "./"

const noop = createAction("NOOP")
const inc = createAction("INC")
const dec = createAction("DEC")

const counter: any = createReducer({ count: 0 }, [
  inc.case(({ count }, v = 1) => ({ count: count + v })),
  dec.case(({ count }, v = 1) => ({ count: count - v })),
])

const dupecounter: any = createReducer({ count: 0 }, [
  inc.case(({ count }, v = 1) => ({ count: count + v })),
  inc.case(({ count }, v = 1) => ({ count: count + v })),
  dec.case(({ count }, v = 1) => ({ count: count - v })),
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
        inc.case(({ count }, v = 1) => ({ count: count + v })),
      ])
      const store = createStore(counter)
      store.dispatch(inc(1))
      expect(store.getState()).toEqual({ count: 2 })
    })

    it("Should break after first case", () => {
      const counter: any = createReducer({ count: 0 }, [
        inc.case(({ count }, v = 1) => ({ count: count + v })),
        inc.case(({ count }, v = 1) => ({ count: count + v })),
      ], { breakCase: true })
      const store = createStore(counter)
      store.dispatch(inc(1))
      expect(store.getState()).toEqual({ count: 1 })
    })
  })
})
