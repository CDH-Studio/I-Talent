import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import LangProficiencyFormView from "./LangProficiencyFormView";
import config from "../../../config";

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
  const [networkErrors, setNetworkErrors] = useState([]);

  // Get user profile for form drop down
  const getProfileInfo = async () => {
    try {
      const url = `${backendAddress}api/private/profile/${localStorage.getItem(
        "userId"
      )}`;
      const result = await axios.get(url);
      setProfileInfo(result.data);
      return 1;
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      throw new Error(error);
    }
  };

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
      .catch(error => {
        setLoad(false);
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  return (
    <LangProficiencyFormView
      languageOptions={languageOptions}
      networkErrors={networkErrors}
      proficiencyOptions={proficiencyOptions}
      profileInfo={profileInfo}
      formType={formType}
      load={load}
    />
  );
};

LangProficiencyForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default LangProficiencyForm;
