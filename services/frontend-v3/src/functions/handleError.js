import { message } from "antd";

import { addError } from "../redux/slices/errorsSlice";
import history from "../history";
import store from "../redux";

import enIntlMessages from "../i18n/en_CA.json";
import frIntlMessages from "../i18n/fr_CA.json";

import config from "../config";
const { enableErrorRedirect } = config;

const intlMessageKey = "error.save";

const errorMessages = {
  en: enIntlMessages[intlMessageKey] || intlMessageKey,
  fr: frIntlMessages[intlMessageKey] || intlMessageKey,
};

export default (error, handleType) => {
  if (handleType === "redirect" && enableErrorRedirect) {
    store.dispatch(addError(error));
    console.log("history path", history.location.pathname);
    //Ensure that if multiple errors are detected due to async behavior the user is only redirected once
    if (history.location.pathname !== "/error") {
      history.push("/error");
    }
  } else if (handleType === "message") {
    message.error(errorMessages[store.getState().settings.locale]);
  }
};
