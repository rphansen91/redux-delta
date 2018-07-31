# DeltaX

## Description

Helper methods and cli to remove the boilerplate of Redux project setup and development.

## Setup

1. `npm install deltax --save`
2. `cd <src directory>`
3. `deltax create`

## Usage

1. Create Actions

```js
// ./store/actions/counter.js
import { createAction as ca } from "deltax"

export const inc = ca("INCREMENT")
export const dec = ca("DECREMENT")
```

2. Create Reducer

  `deltax reducer counter`

```js
// ./store/reducers/counter.js
import { createReducer as cr } from "deltax"
import { inc, dec } from "../actions/counter"

export default cr({ count: 0 }, [
  inc.case(({ count }, v = 1) => ({ count: count + v })),
  dec.case(({ count }, v = 1) => ({ count: count - v }))
])

```

3. Dispatch Actions

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

## [Example](/example.js)
