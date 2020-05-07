import React, { useState, useEffect } from "react";
import LangProficiencyFormView from "./LangProficiencyFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
const LangProficiencyForm = (props) => {
  const [languageOptions, setLanguageOptions] = useState(null);
  const [proficiencyOptions, setProficiencyOptions] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  // Get user profile for form drop down
  const getProfileInfo = async () => {
    try {
      let url =
        backendAddress +
        "api/private/profile/" +
        localStorage.getItem("userId");
      let result = await axios.get(url);
      setProfileInfo(result.data);
      return 1;
    } catch (error) {
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
      .catch((error) => {
        setLoad(false);
        console.log(error);
      });
  }, []);

  return (
    <LangProficiencyFormView
      languageOptions={languageOptions}
      proficiencyOptions={proficiencyOptions}
      profileInfo={profileInfo}
      formType={props.formType}
      load={load}
    />
  );
};

export default LangProficiencyForm;
