import { message } from "antd";
import { IntlProvider } from "react-intl";
import { addError } from "../redux/slices/errorsSlice";
import history from "../history";
import store from "../redux";
import enIntlMessages from "../i18n/en_CA.json";
import frIntlMessages from "../i18n/fr_CA.json";
import config from "../config";
import FormLabelTooltip from "../components/formLabelTooltip/FormLabelTooltip";
const { enableErrorRedirect } = config;

const errorMessages = {
  en: enIntlMessages["error.save"] || "error.save",
  fr: frIntlMessages["error.save"] || "error.save",
};

export default (error, performReduxDispatch, handleType) => {
  if (performReduxDispatch) {
    console.log(performReduxDispatch);
    console.log(" err", errorMessages);
    console.log(store);
    store.dispatch(addError(error));
  }
  if (handleType === "redirect" && enableErrorRedirect) {
    history.push("/error");
  } else if (handleType === "message") {
    message.error(errorMessages[store.getState().settings.locale]);
  }
};
