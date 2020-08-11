/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../../../utils/axios-instance";
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

  // const [expiredSecondaryGradings, setExpiredSecondaryGradings] = useState({});
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [unknownExpiredGrades, setUnknownExpiredGrades] = useState({
    reading: false,
    writing: false,
    oral: false,
  });

  const history = useHistory();
  const axios = useAxios();
  const { id } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    await axios
      .get(`api/profile/private/${id}?language=${locale}`)
      .then((result) => {
        if (result.data && result.data.secondLangProfs) {
          const readingObj = result.data.secondLangProfs.find(
            (grading) => grading.proficiency === "READING"
          );
          const writingObj = result.data.secondLangProfs.find(
            (grading) => grading.proficiency === "WRITING"
          );
          const oralObj = result.data.secondLangProfs.find(
            (grading) => grading.proficiency === "ORAL"
          );

          setUnknownExpiredGrades({
            reading: readingObj && readingObj.expired && !readingObj.date,
            writing: writingObj && writingObj.expired && !writingObj.date,
            oral: oralObj && oralObj.expired && !oralObj.date,
          });
        }

        setProfileInfo(result.data);
      });
  }, [id, locale]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // Set proficiency options
    setProficiencyOptions([
      { key: "A", value: "A", text: "A" },
      { key: "B", value: "B", text: "B" },
      { key: "C", value: "C", text: "C" },
      { key: "E", value: "E", text: "E" },
      { key: "X", value: "X", text: "X" },
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

    // Get all required data component
    getProfileInfo()
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        handleError(error, "redirect");
      });
  }, [getProfileInfo]);

  return (
    <LangProficiencyFormView
      languageOptions={languageOptions}
      proficiencyOptions={proficiencyOptions}
      profileInfo={profileInfo}
      formType={formType}
      load={load}
      history={history}
      userId={id}
      unknownExpiredGrades={unknownExpiredGrades}
      setUnknownExpiredGrades={setUnknownExpiredGrades}
    />
  );
};

LangProficiencyForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default LangProficiencyForm;
