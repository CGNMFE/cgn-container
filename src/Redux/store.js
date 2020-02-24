import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./Reducers/rootReducer";

export const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware)
);

export default store;
