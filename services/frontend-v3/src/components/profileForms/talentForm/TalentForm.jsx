import React, { useState, useEffect } from "react";
import TalentFormView from "./TalentFormView";
import axios from "axios";
import { injectIntl } from "react-intl";
import config from "../../../config";
const { backendAddress } = config;

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
const TalentForm = (props) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [skillOptions, setSkillOptions] = useState(null);
  const [competencyOptions, setCompetencyOptions] = useState(null);
  const [load, setLoad] = useState(false);
  const [savedCompetencies, setSavedCompetencies] = useState();
  const [savedSkills, setSavedSkills] = useState();
  const [savedMentorshipSkills, setSavedMentorshipSkills] = useState();

  // get current language code
  let locale = props.intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  /**
   * Get user profile
   */
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

  /**
   * Get all competency options
   *
   * competency options for drop down
   */
  const getCompetencyOptions = async () => {
    try {
      let url = backendAddress + "api/option/getCompetency";
      let result = await axios.get(url);
      let options = [];

      // Generate the data for dropdown
      for (var i = 0; i < result.data.length; i++) {
        var option = {
          title: result.data[i].description[locale],
          key: result.data[i].id,
        };
        options.push(option);
      }

      setCompetencyOptions(options);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * Get all skill options
   *
   * generate the dataTree of skills and skill categories for the TreeSelect
   */
  const getSkillOptions = async () => {
    try {
      let dataTree = [];

      // Get user profile
      let url = backendAddress + "api/option/getCategory";
      let result = await axios.get(url);

      // Loop through all skill categories
      for (var i = 0; i < result.data.length; i++) {
        var parent = {
          title: result.data[i].description[locale],
          value: result.data[i].id,
          children: [],
        };

        dataTree.push(parent);
        // Loop through skills in each category
        for (var w = 0; w < result.data[i].skills.length; w++) {
          var child = {
            title:
              result.data[i].description[locale] +
              ": " +
              result.data[i].skills[w].description[locale],
            value: result.data[i].skills[w].id,
            key: result.data[i].skills[w].id,
          };
          dataTree[i].children.push(child);
        }
      }

      setSkillOptions(dataTree);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * Get saved competencies
   *
   * get saved competencies from profile
   */
  const getSavedCompetencies = () => {
    let selected = [];
    for (let i = 0; i < profileInfo.competencies.length; i++) {
      selected.push(profileInfo.competencies[i].id);
    }
    setSavedCompetencies(selected);
  };

  /**
   * Get saved skills from profile
   *
   * generate an array of skill ids saved in profile
   */
  const getSavedSkills = () => {
    let selected = [];
    for (let i = 0; i < profileInfo.skills.length; i++) {
      selected.push(profileInfo.skills[i].id);
    }
    setSavedSkills(selected);
  };

  /**
   * Get saved mentorship from profile
   *
   * generate an array of mentorship skill ids saved in profile
   */
  const getSavedMentorshipSkill = () => {
    let selected = [];
    for (let i = 0; i < profileInfo.mentorshipSkills.length; i++) {
      selected.push(profileInfo.mentorshipSkills[i].id);
    }
    setSavedMentorshipSkills(selected);
  };

  // useEffect when profileInfo changes (extracts info from the profileInfo object)
  useEffect(() => {
    if (profileInfo) {
      getSavedCompetencies();
      getSavedSkills();
      getSavedMentorshipSkill();
    }
  }, [profileInfo]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // get all required data component
    Promise.all([getProfileInfo(), getSkillOptions(), getCompetencyOptions()])
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        console.log(error);
      });
  }, [locale]);

  return (
    <TalentFormView
      profileInfo={profileInfo}
      skillOptions={skillOptions}
      competencyOptions={competencyOptions}
      savedCompetencies={savedCompetencies}
      savedSkills={savedSkills}
      savedMentorshipSkills={savedMentorshipSkills}
      formType={props.formType}
      locale={locale}
      load={load}
    />
  );
};

export default injectIntl(TalentForm);
