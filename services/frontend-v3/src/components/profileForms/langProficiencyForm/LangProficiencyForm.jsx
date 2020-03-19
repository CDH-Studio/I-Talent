import React, { useState, useEffect } from "react";
import LangProficiencyFormView from "./LangProficiencyFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

/**
 *  EmploymentDataForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
function LangProficiencyForm() {
  const [languageOptions, setLanguageOptions] = useState(null);
  const [proficiencyOptions, setProficiencyOptions] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  /* useEffect to run once component is mounted */
  useEffect(() => {
    /* get substantive level options */
    const getLanguageOptions = () => {
      const languages = [
        {
          key: "en",
          value: "en",
          text: "English"
        },
        {
          key: "fr",
          value: "fr",
          text: "Français"
        }
      ];
      setLanguageOptions(languages);
    };

    const getProficiencyOptions = () => {
      const proficiency = [
        { key: "A", value: "A", text: "A" },
        { key: "B", value: "B", text: "B" },
        { key: "C", value: "C", text: "C" },
        { key: "E", value: "E", text: "E" },
        { key: "X", value: "X", text: "X" }
      ];
      setProficiencyOptions(proficiency);
    };

    /* get user profile for form drop down */
    const getProfileInfo = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        await setProfileInfo(result.data);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* get all required data component */
    const getAllData = async () => {
      try {
        await getLanguageOptions();
        await getProficiencyOptions();
        await getProfileInfo();
        setLoad(true);
        return 1;
      } catch (error) {
        setLoad(false);
        console.log(error);
        return 0;
      }
    };

    getAllData();
  }, []);

  return (
    <LangProficiencyFormView
      languageOptions={languageOptions}
      proficiencyOptions={proficiencyOptions}
      profileInfo={profileInfo}
      load={load}
    />
  );
}

export default LangProficiencyForm;
