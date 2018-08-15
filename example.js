const fetch = require("node-fetch")
const { createStore, combineReducers, applyMiddleware, compose } = require("redux")
const { default: delta, createAction, createReducer } = require("./")
const { asyncAction } = require("./dist/package/lib/dx/asyncAction")

// COUNTER
const inc = createAction("INC")
const dec = createAction("DEC")
const reset = createAction("RESET")

const counter = createReducer(
  { count: 0, resets: 0 },
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

// ASYNC

const loadProfile = asyncAction("PROFILE", (id, dispatch, getState) =>
  fetch(`https://swapi.co/api/people/${id}?format=json`)
  .then(res => res.json()))

// INITIALIZE STORE

const store = createStore(combineReducers({
  counter,
  profile: loadProfile.reducer
}), {}, compose(applyMiddleware(delta)))

store.subscribe(_ =>
  console.log(store.getState()))

// DISPATCH TO STORE

store.dispatch(reset())
store.dispatch(inc(10))
store.dispatch(dec(5))
store.dispatch(loadProfile(1))
store.dispatch(reset())
