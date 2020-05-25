import { addError } from "../redux/slices/errorsSlice";
import config from "../config";
import history from "../history";
import store from "../redux";

const { enableErrorRedirect } = config;

export default (error, performReduxDispatch, performRedirect) => {
  if (performReduxDispatch) {
    store.dispatch(addError(error));
    if (performRedirect && enableErrorRedirect) {
      history.push("/error");
    }
  }
};
