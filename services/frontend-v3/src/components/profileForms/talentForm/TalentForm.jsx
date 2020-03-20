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
  const [savedCompetencies, setSavedCompetencies] = useState();
  const [savedSkills, setSavedSkills] = useState();
  const [savedMentorshipSkills, setSavedMentorshipSkills] = useState();

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
    const getSavedCompetencies = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];
        for (let i = 0; i < result.data.competencies.length; i++) {
          selected.push(result.data.competencies[i].id);
        }
        await setSavedCompetencies(selected);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* get user profile for form drop down */
    const getSavedSkills = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];
        for (let i = 0; i < result.data.skills.length; i++) {
          selected.push(result.data.skills[i].id);
        }
        await setSavedSkills(selected);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    const getSavedMentorshipSkill = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];
        for (let i = 0; i < result.data.mentorshipSkills.length; i++) {
          selected.push(result.data.mentorshipSkills[i].id);
        }
        await setSavedMentorshipSkills(selected);
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
              title:
                result.data[i].description.en +
                ": " +
                result.data[i].skills[w].description.descEn,
              value: result.data[i].skills[w].id,
              key: result.data[i].skills[w].id
            };
            dataTree[i].children.push(child);
          }
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
        await getSavedCompetencies();
        await getSavedSkills();
        await getSavedMentorshipSkill();
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
    <TalentFormView
      languageOptions={languageOptions}
      proficiencyOptions={proficiencyOptions}
      profileInfo={profileInfo}
      skillOptions={skillOptions}
      competencyOptions={competencyOptions}
      savedCompetencies={savedCompetencies}
      savedSkills={savedSkills}
      savedMentorshipSkills={savedMentorshipSkills}
      load={load}
    />
  );
}

export default TalentForm;
