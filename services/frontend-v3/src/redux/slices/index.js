import { combineReducers } from "redux";
import settings from "./settingsSlice";
import errors from "./errorsSlice";
import user from "./userSlice";

export default combineReducers({
  settings,
  errors,
  user,
});
