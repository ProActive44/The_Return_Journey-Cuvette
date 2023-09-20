import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Reducer } from "./reducer";

const store = createStore(Reducer, applyMiddleware(thunk));

export { store };
