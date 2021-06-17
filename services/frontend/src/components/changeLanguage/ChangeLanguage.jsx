import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChangeLanguageView from "./ChangeLanguageView";
import { setLocale } from "../../redux/slices/settingsSlice";
import useAxios from "../../utils/useAxios";
import handleError from "../../functions/handleError";

const ChangeLanguage = () => {
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
        .put(`api/profile/${userID}?language=${languageCode}`, {
          preferredLanguage: languageCode,
        })
        .catch((error) => handleError(error, "message", history));
    }
  };

  return <ChangeLanguageView handleLanguageChange={handleLanguageChange} />;
};

export default ChangeLanguage;
