# <img src="https://raw.githubusercontent.com/rphansen91/redux-delta/master/assets/redux-delta.svg?sanitize=true" alt="redux-delta" width="100" height="100"> Redux Delta

[![Travis Build](https://img.shields.io/travis/rphansen91/redux-delta.svg?style=flat-square)](https://travis-ci.org/rphansen91/redux-delta)
[![Codecov](https://img.shields.io/codecov/c/github/rphansen91/redux-delta.svg?style=flat-square)](https://codecov.io/gh/rphansen91/redux-delta)
[![npm](https://img.shields.io/npm/v/redux-delta.svg?style=flat-square)](https://www.npmjs.com/package/redux-delta)
[![downloads](https://img.shields.io/npm/dw/redux-delta.svg?style=flat-square)](https://www.npmjs.com/package/redux-delta)

## Description

Helper methods and cli to remove the boilerplate of Redux project setup and development.

## [Examples](https://github.com/rphansen91/redux-delta/blob/master/examples)

## Setup

1. `npm install redux-delta --save`
2. `cd <src directory>`
3. `redux-delta create`

## Usage

### 1. Create Actions

```js
// ./store/actions/counter.js
import { createAction as ca } from "redux-delta"

export const inc = ca("INCREMENT")
export const dec = ca("DECREMENT")
```

### 2. Create Reducer

`redux-delta reducer counter`

```js
// ./store/reducers/counter.js
import { createReducer as cr } from "redux-delta"
import { inc, dec } from "../actions/counter"

export default cr({ count: 0 }, [
  inc.case(({ count }, v = 1) => ({ count: count + v })),
  dec.case(({ count }, v = 1) => ({ count: count - v }))
])
```

### 3. Dispatch Actions

```js
// ./components/counter.js
import { connect } from "react-redux"
import { inc, dec } from "../store/actions/counter"

export default connect(
  ({ counter }) => ({ counter }),
  dispatch => ({
    inc() {
      dispatch(inc())
    },
    dec() {
      dispatch(dec())
    }
  })
)
```

### 4. Higher Order Deltas

Higher order deltas are common redux patterns that can be reused and extended.

#### 1. toggleΔ

```js
import { createStore } from "redux"
import { toggleΔ } from "redux-delta/lib/dx/toggle"

const toggle = toggleΔ("MENU", { active: false })
const store = createStore(toggle)
store.getState() // { active: false }
store.dispatch(toggle.toggleActive())
store.getState() // { active: true }
store.dispatch(toggle.setActive(false))
store.getState() // { active: false }
store.dispatch(toggle.setActive(true))
store.getState() // { active: true }
```

#### 2. asyncΔ

```js
import { createStore } from "redux"
import { asyncΔ } from "redux-delta/lib/dx/async"

const luke = asyncΔ("Luke Skywalker")

const store = createStore(luke)

store.dispatch(luke.setLoading(true))
store.dispatch(luke.setFailure("")) // Clear out any previous errors
store.getState() // { loading: true, data: null, error: "" }

fetch(`https://swapi.co/api/people/0?format=json`)
  .then(res => res.json())
  .then(res => {
    store.dispatch(luke.setLoading(false))
    store.dispatch(luke.setSuccess(res))
    store.getState() // { loading: false, data: res, error: "" }
  })
  .catch(e => {
    store.dispatch(luke.setLoading(false))
    store.dispatch(luke.setFailure(e.message))
    store.getState() // { loading: true, data: null, error: "The API has succumb to the darkside" }
  })
```

### 5. Compose Higher Order Deltas

```js
import composeDeltas from "redux-delta/lib/dx"
import { toggleΔ } from "redux-delta/lib/dx/toggle"
import { asyncΔ } from "redux-delta/lib/dx/async"

const activeasyncΔ = composeDeltas(toggleΔ, asyncΔ)
const unique = activeasyncΔ("unique/identifier/", initial)
const store = createStore(userinfo)
```
