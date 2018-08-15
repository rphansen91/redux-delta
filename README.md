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
    inc () {
      dispatch(inc())
    },
    dec () {
      dispatch(dec())
    }
  })
)
```

### 4. Higher Order Deltas (HOD)

Higher order deltas are common redux patterns that can be reused and extended.

#### 1. AsyncAction

  ```js
  import { combineReducers } from "redux"
  import { asyncAction } from "redux-delta/dx/asyncAction"

  const loadLuke = asyncAction("PROFILE", (id, dispatch, getState) =>
    fetch(`https://swapi.co/api/people/${id}?format=json`)
    .then(res => res.text()))

  combineReducers({
    luke: loadLuke.reducer
  })

  dispatch(loadProfile(1))
  ```

  State Lifecycle of AsyncAction

  ```js
  // On AsyncAction dispatch
  -> ({ loading: true })
  ```
  ```js
  // On AsyncAction Promise<LukeSkywalker> resolve
  -> ({
    loading: false,
    data: { ...(LukeSkywalker) }
  })
  ```
  ```js
  // On AsyncAction Promise<LukeSkywalker> reject
  -> { loading: false, error: "The API has succumb to the darkside" }
  ```

### 5. Custom Higher Order Deltas (CHOD)
