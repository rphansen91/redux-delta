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
const { default: composeDeltas } = require("../dist/package/lib/dx")
const { asyncΔ } = require("../dist/package/lib/dx/async")
const { paginatorΔ } = require("../dist/package/lib/dx/paginator")
const nextPlanets = `https://swapi.co/api/planets?page=4&format=json`
const nextStarships = `https://swapi.co/api/starships?page=1&format=json`
const pagePlanets = extractPage(nextPlanets)
const pageStarships = extractPage(nextStarships)

// ASYNC

const Luke = asyncΔ("Luke Skywalker")

const pageasyncΔ = composeDeltas(asyncΔ, paginatorΔ)

const Planets = pageasyncΔ("Planets", {
  page: pagePlanets,
  nextPage: nextPlanets
})

const Starships = pageasyncΔ("Starships", {
  page: pageStarships,
  nextPage: nextStarships
})

// INITIALIZE STORE

const { subscribe, dispatch, getState } = createStore(
  combineReducers({
    Luke,
    Planets,
    Starships
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

fetch(getState().Planets.nextPage)
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

fetch(getState().Starships.nextPage)
  .then(res => res.json())
  .then(({ next, results, count }) => {
    const { nextPage } = getState().Starships
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
