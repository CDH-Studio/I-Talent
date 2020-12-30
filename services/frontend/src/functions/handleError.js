import { notification } from "antd";

import { addError } from "../redux/slices/errorsSlice";
import store from "../redux";

import enIntlMessages from "../i18n/en_CA.json";
import frIntlMessages from "../i18n/fr_CA.json";

import config from "../utils/runtimeConfig";

const { enableErrorRedirect } = config;

const intlMessageKey = "error.data.not.saved";

const errorMessages = {
  ENGLISH: enIntlMessages[intlMessageKey] || intlMessageKey,
  FRENCH: frIntlMessages[intlMessageKey] || intlMessageKey,
};

export default (error, handleType, history) => {
  if (handleType === "redirect" && enableErrorRedirect) {
    store.dispatch(addError(error));
    if (history.location.pathname !== "/error") {
      history.push("/error");
    }
  } else if (handleType === "message") {
    notification.error({
      message: errorMessages[store.getState().settings.locale],
    });
  }
};
