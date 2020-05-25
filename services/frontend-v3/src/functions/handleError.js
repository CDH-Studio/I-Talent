import { addError } from "../redux/slices/errorsSlice";
import config from "../config";

const { enableErrorRedirect } = config;

export default (error, dispatch, history) => {
  if (dispatch) {
    dispatch(addError(error));
    if (history && enableErrorRedirect) {
      history.push("/error");
    }
  }
};
