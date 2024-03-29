import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import handleError from "../../functions/handleError";
import { setLocale } from "../../redux/slices/settingsSlice";
import useAxios from "../../utils/useAxios";
import ChangeLanguageView from "./ChangeLanguageView";

const ChangeLanguage = ({ className }) => {
  const userID = useSelector((state) => state.user.id);
  const userLang = useSelector((state) => state.settings.locale);
  let languageCode = "ENGLISH";
  if (userLang) {
    languageCode = userLang === "ENGLISH" ? "FRENCH" : "ENGLISH";
  }
  const axios = useAxios();
  const history = useHistory();

  const dispatch = useDispatch();

  const handleLanguageChange = async () => {
    dispatch(setLocale(languageCode));
    if (userID) {
      await axios
        .put(`profile/${userID}?language=${languageCode}`, {
          preferredLanguage: languageCode,
        })
        .catch((error) => handleError(error, "message", history));
    }
  };

  return (
    <ChangeLanguageView
      className={className}
      handleLanguageChange={handleLanguageChange}
    />
  );
};

ChangeLanguage.propTypes = {
  className: PropTypes.string,
};

ChangeLanguage.defaultProps = {
  className: "",
};

export default ChangeLanguage;
