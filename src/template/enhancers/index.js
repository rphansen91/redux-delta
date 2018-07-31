import { applyMiddleware, compose } from "redux";
import sauce from "redux-sauce";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers(
  applyMiddleware(sauce)
);
