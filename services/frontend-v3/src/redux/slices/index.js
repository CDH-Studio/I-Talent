import { combineReducers } from "redux";
import settings from "./settingsSlice";
import errors from "./errorsSlice";

export default combineReducers({
  settings,
  errors,
});
