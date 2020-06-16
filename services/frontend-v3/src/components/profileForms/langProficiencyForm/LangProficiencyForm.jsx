import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LangProficiencyFormView from "./LangProficiencyFormView";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
const LangProficiencyForm = ({ formType }) => {
  const [languageOptions, setLanguageOptions] = useState([]);
  const [proficiencyOptions, setProficiencyOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const history = useHistory();
  const { id } = useSelector((state) => state.user);

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    const url = `${backendAddress}api/profile/private/${id}`;
    const result = await axios.get(url);
    setProfileInfo(result.data);
    return 1;
  }, [id]);

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
        key: "en",
        value: "en",
        text: "English",
      },
      {
        key: "fr",
        value: "fr",
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
    />
  );
};

LangProficiencyForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default LangProficiencyForm;
