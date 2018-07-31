import { applyMiddleware, compose } from "redux";
import deltax from "deltax";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers(
  applyMiddleware(deltax)
);
