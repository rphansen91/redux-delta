import { createStore } from "redux";
import enhancers from "./enhancers";
import initial from "./initial";
import bootStore from "./boot";

const context = require.context("./reducers", true, /\.js$/);
const reducers = {};
context.keys().forEach(function(key) {
  reducers[key] = context(key).default;
});

export { initial, enhancers, reducers, bootStore };

export default (_initial = initial, _enhancers = enhancers) =>
  createStore(reducers, _initial, _enhancers);
