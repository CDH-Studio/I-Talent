import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import handleError from "../../../functions/handleError";
import useAxios from "../../../utils/useAxios";
import LangProficiencyFormView from "./LangProficiencyFormView";

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
            level: values.oralProficiency,
            proficiency: "ORAL",
            status: values.secondaryOralStatus,
          });
        }

        if (values.writingProficiency) {
          dbValues.secondLangProfs.push({
            level: values.writingProficiency,
            proficiency: "WRITING",
            status: values.secondaryWritingStatus,
          });
        }

        if (values.readingProficiency) {
          dbValues.secondLangProfs.push({
            level: values.readingProficiency,
            proficiency: "READING",
            status: values.secondaryReadingStatus,
          });
        }
      }
    }

    await axios.put(`profile/${id}?language=${locale}`, dbValues);
  };

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    await axios
      .get(`profile/private/${id}?language=${locale}`)
      .then((result) => {
        setProfileInfo(result.data);
      });
  }, [axios, id, locale]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // Set proficiency options
    setProficiencyOptions([
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
      { label: "E", value: "E" },
      { label: "X", value: "X" },
      {
        label: intl.formatMessage({ id: "grade.not.applicable" }),
        value: "NA",
      },
    ]);

    // Set substantive level options
    setLanguageOptions([
      {
        label: "English",
        value: "ENGLISH",
      },
      {
        label: "Français",
        value: "FRENCH",
      },
    ]);

    // Set status options:
    setStatusOptions([
      {
        label: intl.formatMessage({ id: "expired" }),
        value: "EXPIRED",
      },
      {
        label: intl.formatMessage({ id: "valid" }),
        value: "VALID",
      },
      {
        label: intl.formatMessage({ id: "unknown" }),
        value: "UNKNOWN",
      },
      {
        label: intl.formatMessage({ id: "grade.not.applicable" }),
        value: "NA",
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
      formType={formType}
      history={history}
      languageOptions={languageOptions}
      load={load}
      proficiencyOptions={proficiencyOptions}
      profileInfo={profileInfo}
      saveDataToDB={saveDataToDB}
      statusOptions={statusOptions}
      userId={id}
    />
  );
};

LangProficiencyForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default LangProficiencyForm;
