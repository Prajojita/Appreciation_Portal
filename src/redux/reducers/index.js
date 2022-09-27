import { combineReducers } from "redux";
import appReducer from "./appReducer";

const reducers = combineReducers({
  appReducer: appReducer,
});

export default reducers;
