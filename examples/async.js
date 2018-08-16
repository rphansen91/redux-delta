const fetch = require("node-fetch")
const {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} = require("redux")
const {
  default: delta,
  createAction,
  createReducer
} = require("../dist/package/lib")
const { Async } = require("../dist/package/lib/dx/async")
const { Paginator } = require("../dist/package/lib/dx/paginator")
const nextPlanets = `https://swapi.co/api/planets?page=4&format=json`
const nextStarships = `https://swapi.co/api/starships?page=1&format=json`
const pagePlanets = extractPage(nextPlanets)
const pageStarships = extractPage(nextStarships)

// ASYNC

const Luke = new Async("Luke Skywalker")
const Planets = new Paginator("Planets")
const Starships = new Paginator("Starships")

// INITIALIZE STORE

const { subscribe, dispatch, getState } = createStore(
  combineReducers({
    ...Luke.createReducer(),
    ...Planets.createReducer({ page: pagePlanets, nextPage: nextPlanets }),
    ...Starships.createReducer({ page: pageStarships, nextPage: nextStarships })
  }),
  {},
  compose(applyMiddleware(delta))
)

subscribe(_ => console.log(getState()))

// DISPATCH TO STORE

dispatch(Luke.setLoading(true))
dispatch(Planets.setLoading(true))
dispatch(Starships.setLoading(true))

fetch(`https://swapi.co/api/people/1?format=json`)
  .then(res => res.json())
  .then(luke => {
    dispatch(Luke.setLoading(false))
    dispatch(Luke.setSuccess(luke))
  })
  .catch(err => {
    dispatch(Luke.setLoading(false))
    dispatch(Luke.setFailure(err.message))
  })

fetch(Planets.mapper(getState()).nextPage)
  .then(res => res.json())
  .then(({ next, results, count }) => {
    const { nextPage } = Planets.mapper(getState())
    const max = Math.ceil(count / results.length)
    const page = extractPage(nextPage)
    !isNaN(page) && dispatch(Planets.setPage(page))
    dispatch(Planets.setNextPage(next))
    dispatch(Planets.setMaxPages(max))
    dispatch(Planets.setSuccess(results))
    dispatch(Planets.setLoading(false))
  })
  .catch(err => {
    dispatch(Planets.setLoading(false))
    dispatch(Planets.setFailure(err.message))
  })

fetch(Starships.mapper(getState()).nextPage)
  .then(res => res.json())
  .then(({ next, results, count }) => {
    const { nextPage } = Starships.mapper(getState())
    const max = Math.ceil(count / results.length)
    const page = extractPage(nextPage)
    !isNaN(page) && dispatch(Starships.setPage(page))
    dispatch(Starships.setNextPage(next))
    dispatch(Starships.setMaxPages(max))
    dispatch(Starships.setSuccess(results))
    dispatch(Starships.setLoading(false))
  })
  .catch(err => {
    dispatch(Starships.setLoading(false))
    dispatch(Starships.setFailure(err.message))
  })

function extractPage(uri = "") {
  return Number((uri.split("page=")[1] || "").split("&")[0])
}
