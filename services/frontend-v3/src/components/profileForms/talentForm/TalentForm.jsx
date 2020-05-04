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
function TalentForm(props) {
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

  /* useEffect to run once component is mounted */
  useEffect(() => {
    /*
     * get user profile
     *
     */
    const getProfileInfo = async () => {
      try {
        let url =
          backendAddress +
          "api/private/profile/" +
          localStorage.getItem("userId");
        let result = await axios.get(url);
        await setProfileInfo(result.data);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * get all competency options
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

        await setCompetencyOptions(options);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*  */
    /*
     * get saved competencies
     *
     * get saved competencies from profile
     */
    const getSavedCompetencies = async () => {
      try {
        let url =
          backendAddress +
          "api/private/profile/" +
          localStorage.getItem("userId");
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

    /*
     * get all skill options
     *
     * generate the dataTree of skills and skill categories for the TreeSelect
     */
    const getSkillOptions = async () => {
      try {
        let dataTree = [];

        // get user profile
        let url = backendAddress + "api/option/getCategory";
        let result = await axios.get(url);

        // loop through all skill categories
        for (var i = 0; i < result.data.length; i++) {
          var parent = {
            title: result.data[i].description[locale],
            value: result.data[i].id,
            children: [],
          };

          dataTree.push(parent);
          // loop through skills in each category
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

        await setSkillOptions(dataTree);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * get saved skills from profile
     *
     * generate an array of skill ids saved in profile
     */
    const getSavedSkills = async () => {
      try {
        let url =
          backendAddress +
          "api/private/profile/" +
          localStorage.getItem("userId");
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

    /*
     * get saved mentorship from profile
     *
     * generate an array of mentorship skill ids saved in profile
     */
    const getSavedMentorshipSkill = async () => {
      try {
        let url =
          backendAddress +
          "api/private/profile/" +
          localStorage.getItem("userId");
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

    /* get all required data component */
    const getAllData = async () => {
      try {
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
}

export default injectIntl(TalentForm);
