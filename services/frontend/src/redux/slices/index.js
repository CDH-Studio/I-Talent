import { combineReducers } from "redux";

import admin from "./adminSlice";
import errors from "./errorsSlice";
import settings from "./settingsSlice";
import state from "./stateSlice";
import stats from "./statsSlice";
import user from "./userSlice";

export default combineReducers({
  admin,
  errors,
  settings,
  state,
  stats,
  user,
});
