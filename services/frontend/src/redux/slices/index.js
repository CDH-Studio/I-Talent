import { combineReducers } from "redux";
import settings from "./settingsSlice";
import errors from "./errorsSlice";
import user from "./userSlice";
import stats from "./statsSlice";
import admin from "./adminSlice";
import state from "./stateSlice";

export default combineReducers({
  settings,
  errors,
  user,
  stats,
  admin,
  state,
});
