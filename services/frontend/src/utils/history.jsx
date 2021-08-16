import { createIntl, createIntlCache } from "react-intl";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

import messagesEn from "../i18n/en_CA.json";
import messagesFr from "../i18n/fr_CA.json";
import store from "../redux";

const cache = createIntlCache();

const getUserConfirmation = (_content, callback) => {
  let intl;

  if (store.getState().settings.locale === "ENGLISH") {
    intl = createIntl({ locale: "en", messages: messagesEn }, cache);
  } else {
    intl = createIntl({ locale: "fr", messages: messagesFr }, cache);
  }

  Modal.confirm({
    cancelText: intl.formatMessage({ id: "no" }),
    content: intl.formatMessage({
      id: "form.unsaved.alert.content",
    }),
    icon: <ExclamationCircleOutlined />,
    okText: intl.formatMessage({ id: "yes" }),
    onCancel: () => {
      callback(false);
    },
    onOk: () => {
      callback(true);
    },
    title: intl.formatMessage({
      id: "form.unsaved.alert.title",
    }),
  });
};

export default { getUserConfirmation };
