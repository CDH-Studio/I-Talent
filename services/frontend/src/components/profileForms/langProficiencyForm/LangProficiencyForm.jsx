import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";

import useAxios from "../../../utils/useAxios";
import LangProficiencyFormView from "./LangProficiencyFormView";
import handleError from "../../../functions/handleError";

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
const LangProficiencyForm = ({ formType }) => {
  const [languageOptions, setLanguageOptions] = useState([]);
  const [proficiencyOptions, setProficiencyOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  const history = useHistory();
  const axios = useAxios();
  const intl = useIntl();
  const { id } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);

  /* Save data */
  const saveDataToDB = async (values, displaySecondLangForm) => {
    const dbValues = {
      secondLangProfs: [],
    };

    // If firstLanguage is undefined then clear value in DB
    if (values.firstLanguage) {
      dbValues.firstLanguage = values.firstLanguage;
    } else {
      dbValues.firstLanguage = null;
    }

    if (displaySecondLangForm) {
      // set second language based on first language
      dbValues.secondLanguage =
        values.firstLanguage === "ENGLISH" ? "FRENCH" : "ENGLISH";

      if (
        values.oralProficiency ||
        values.writingProficiency ||
        values.readingProficiency
      ) {
        if (values.oralProficiency) {
          dbValues.secondLangProfs.push({
            proficiency: "ORAL",
            level: values.oralProficiency,
            status: values.secondaryOralStatus,
          });
        }

        if (values.writingProficiency) {
          dbValues.secondLangProfs.push({
            proficiency: "WRITING",
            level: values.writingProficiency,
            status: values.secondaryWritingStatus,
          });
        }

        if (values.readingProficiency) {
          dbValues.secondLangProfs.push({
            proficiency: "READING",
            level: values.readingProficiency,
            status: values.secondaryReadingStatus,
          });
        }
      }
    }

    await axios.put(`api/profile/${id}?language=${locale}`, dbValues);
  };

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    await axios
      .get(`api/profile/private/${id}?language=${locale}`)
      .then((result) => {
        setProfileInfo(result.data);
      });
  }, [axios, id, locale]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // Set proficiency options
    setProficiencyOptions([
      { key: "A", value: "A", text: "A" },
      { key: "B", value: "B", text: "B" },
      { key: "C", value: "C", text: "C" },
      { key: "E", value: "E", text: "E" },
      { key: "X", value: "X", text: "X" },
      {
        key: "NA",
        value: "NA",
        text: intl.formatMessage({ id: "grade.not.applicable" }),
      },
    ]);

    // Set substantive level options
    setLanguageOptions([
      {
        key: "ENGLISH",
        value: "ENGLISH",
        text: "English",
      },
      {
        key: "FRENCH",
        value: "FRENCH",
        text: "Français",
      },
    ]);

    // Set status options:
    setStatusOptions([
      {
        key: "EXPIRED",
        value: "EXPIRED",
        text: intl.formatMessage({ id: "expired" }),
      },
      {
        key: "VALID",
        value: "VALID",
        text: intl.formatMessage({ id: "valid" }),
      },
      {
        key: "UNKNOWN",
        value: "UNKNOWN",
        text: intl.formatMessage({ id: "unknown" }),
      },
    ]);

    // Get all required data component
    getProfileInfo()
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        handleError(error, "redirect", history);
      });
  }, [getProfileInfo, intl, history]);

  return (
    <LangProficiencyFormView
      languageOptions={languageOptions}
      proficiencyOptions={proficiencyOptions}
      statusOptions={statusOptions}
      profileInfo={profileInfo}
      formType={formType}
      load={load}
      history={history}
      userId={id}
      saveDataToDB={saveDataToDB}
    />
  );
};

LangProficiencyForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default LangProficiencyForm;
