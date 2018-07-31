const fetch = require("node-fetch")
const { createStore, combineReducers, applyMiddleware, compose } = require("redux")
const { reduxSauceMiddleware, createAction, createReducer, createAsyncAction } = require("./lib/lib")

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

const loadProfile = createAsyncAction("PROFILE", (id) =>
  fetch(`https://swapi.co/api/people/${id}?format=json`)
  .then(res => res.text()))

// INITIALIZE STORE

const store = createStore(combineReducers({
  counter,
  profile: loadProfile.reducer
}), {}, compose(applyMiddleware(reduxSauceMiddleware())))

store.subscribe(_ => console.log(store.getState()))

// DISPATCH TO STORE

store.dispatch(reset())
store.dispatch(inc(10))
store.dispatch(dec(5))
store.dispatch(loadProfile(1))
store.dispatch(reset())
