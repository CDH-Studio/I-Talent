import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import SettingsLayout from "../components/layouts/settingsLayout/SettingsLayout";

const Settings = () => {
  const intl = useIntl();

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: "settings.title",
    })} | I-Talent`;
  }, [intl]);

  return <SettingsLayout displaySideBar />;
};

export default Settings;
