import React from "react";
import { createBrowserHistory } from "history";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { createIntl, createIntlCache } from "react-intl";

import messagesEn from "../i18n/en_CA.json";
import messagesFr from "../i18n/fr_CA.json";
import store from "../redux";

const cache = createIntlCache();

const history = createBrowserHistory({
  getUserConfirmation(_content, callback) {
    let intl;

    if (store.getState().settings.locale === "ENGLISH") {
      intl = createIntl({ locale: "en", messages: messagesEn }, cache);
    } else {
      intl = createIntl({ locale: "fr", messages: messagesFr }, cache);
    }

    Modal.confirm({
      title: intl.formatMessage({ id: "profile.form.unsaved.alert.title" }),
      content: intl.formatMessage({ id: "profile.form.unsaved.alert.content" }),
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        callback(true);
      },
      onCancel: () => {
        callback(false);
      },
      okText: intl.formatMessage({ id: "profile.yes" }),
      cancelText: intl.formatMessage({ id: "profile.no" }),
    });
  },
});

export default history;
