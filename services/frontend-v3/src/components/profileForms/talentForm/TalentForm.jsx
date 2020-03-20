import React, { useState, useEffect } from "react";
import TalentFormView from "./TalentFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
function TalentForm() {
  const [languageOptions, setLanguageOptions] = useState(null);
  const [proficiencyOptions, setProficiencyOptions] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [skillOptions, setSkillOptions] = useState(null);
  const [competencyOptions, setCompetencyOptions] = useState(null);
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

    /* get user profile for form drop down */
    const getCompetencyOptions = async () => {
      try {
        let url = backendAddress + "api/option/getCompetency";
        let result = await axios.get(url);
        console.log(result);
        await setCompetencyOptions(result.data);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* get user profile for form drop down */
    const getSkillOptions = async () => {
      try {
        let url = backendAddress + "api/option/getCategory";
        let result = await axios.get(url);
        console.log(result.data);
        //console.log(result.data);
        //result.data.foreach(element => console.log(element));
        let dataTree = [];
        for (var i = 0; i < result.data.length; i++) {
          var parent = {
            title: result.data[i].description.en,
            value: result.data[i].id,
            children: []
          };

          dataTree.push(parent);

          for (var w = 0; w < result.data[i].skills.length; w++) {
            var child = {
              title: result.data[i].skills[w].description.descEn,
              value: result.data[i].skills[w].id,
              key: result.data[i].skills[w].id
            };
            dataTree[i].children.push(child);
          }
          // dataTree.push(obj);

          // dataTree[i].value = result.data[i].id;
          // var obj = arr[i];
          // for (var key in obj) {
          //   var attrName = key;
          //   var attrValue = obj[key];
          // }
        }

        await setSkillOptions(dataTree);
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
        await getSkillOptions();
        await getCompetencyOptions();
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

  console.log(skillOptions);
  return (
    <TalentFormView
      languageOptions={languageOptions}
      proficiencyOptions={proficiencyOptions}
      profileInfo={profileInfo}
      skillOptions={skillOptions}
      competencyOptions={competencyOptions}
      load={load}
    />
  );
}

export default TalentForm;
