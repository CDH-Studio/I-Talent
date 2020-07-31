import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../../utils/axios-instance";
import { IntlPropType } from "../../utils/customPropTypes";
import { setLocale } from "../../redux/slices/settingsSlice";

import handleError from "../../functions/handleError";

const ChangeLanguageView = ({ intl }) => {
  const languageCode = intl.formatMessage({ id: "lang.db.code" });
  const userID = useSelector((state) => state.user.id);
  const axios = useAxios();

  const dispatch = useDispatch();

  const handleLanguageChange = async () => {
    dispatch(setLocale(languageCode));
    if (userID) {
      await axios
        .put(`api/profile/${userID}?language=${languageCode}`, {
          preferredLanguage: languageCode,
        })
        .catch((error) => handleError(error, "message"));
    }
  };

  return (
    <Button
      ghost="true"
      type="default"
      tabIndex="0"
      onClick={handleLanguageChange}
      style={{ textTransform: "uppercase" }}
    >
      <GlobalOutlined />{" "}
      <FormattedMessage
        style={{ textTransform: "capitalize" }}
        id="lang.code"
      />
    </Button>
  );
};

ChangeLanguageView.propTypes = {
  intl: IntlPropType,
};

ChangeLanguageView.defaultProps = {
  intl: undefined,
};

export default injectIntl(ChangeLanguageView);
