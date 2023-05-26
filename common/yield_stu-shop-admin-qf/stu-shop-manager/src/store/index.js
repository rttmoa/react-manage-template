import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import product from "./reducers/product";
import notice from "./reducers/notice";

const rootReducer = combineReducers({
  product, // product: product
  notice
});

export default createStore(rootReducer, compose(applyMiddleware(...[thunk])));
