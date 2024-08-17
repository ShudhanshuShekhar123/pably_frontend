import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as authreducer } from "./Authreducer/reducer";
import { reducer as taskreducer } from "./Taskreducer/reducer";

const rootreduceer = combineReducers({
  authreducer,
  taskreducer,
});

export const store = legacy_createStore(rootreduceer, applyMiddleware(thunk));