import { applyMiddleware, compose } from "redux";
import delta from "redux-delta";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers(
  applyMiddleware(delta)
);
