import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl } from "react-intl";
import ChangeLanguageView from "./ChangeLanguageView";
import { setLocale } from "../../redux/slices/settingsSlice";
import useAxios from "../../utils/useAxios";
import handleError from "../../functions/handleError";
import { IntlPropType } from "../../utils/customPropTypes";

const ChangeLanguage = ({ intl }) => {
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

  return <ChangeLanguageView handleLanguageChange={handleLanguageChange} />;
};

ChangeLanguage.propTypes = {
  intl: IntlPropType,
};

ChangeLanguage.defaultProps = {
  intl: undefined,
};

export default injectIntl(ChangeLanguage);
