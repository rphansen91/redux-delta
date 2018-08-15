const { createStore, combineReducers } = require("redux")
const { createAction, createReducer } = require("../dist/package/lib")

// COUNTER
const initial = { count: 0, resets: 0 }
const inc = createAction("INC")
const dec = createAction("DEC")
const reset = createAction("RESET")

const counter = createReducer(
  initial,
  [
    inc.case(({ count }, v = 1) => ({ count: count + v })),
    dec.case(({ count }, v = 1) => ({ count: count - v })),
    reset.case(), // Noop
    // Executes both reset cases
    // One to clear
    reset.case(() => ({ count: 0 })),
    // One to increment reset count
    reset.case(({ resets }) => ({ resets: resets + 1 }))
  ]
)

// INITIALIZE STORE

const {
  subscribe,
  dispatch,
  getState
} = createStore(combineReducers({ counter }))

subscribe(_ => console.log(getState()))

// DISPATCH TO STORE

dispatch(reset())
dispatch(inc(10))
dispatch(dec(5))
dispatch(reset())

