import { combineReducers } from "redux";
import settings from "./settingsSlice";
import user from "./userSlice";

export default combineReducers({
  settings,
  user,
});
