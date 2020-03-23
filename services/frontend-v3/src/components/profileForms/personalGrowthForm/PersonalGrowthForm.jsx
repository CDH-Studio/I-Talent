import React, { useState, useEffect } from "react";
import PersonalGrowthFormView from "./PersonalGrowthFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
function PersonalGrowthForm() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [skillOptions, setSkillOptions] = useState(null);
  const [competencyOptions, setCompetencyOptions] = useState(null);
  const [load, setLoad] = useState(false);
  const [savedCompetencies, setSavedCompetencies] = useState();
  const [savedSkills, setSavedSkills] = useState();
  const [savedMentorshipSkills, setSavedMentorshipSkills] = useState();
  const [developmentalGoalOptions, setDevelopmentalGoalOptions] = useState();
  const [savedDevelopmentalGoals, setSavedDevelopmentalGoals] = useState();
  const [interestedInRemoteOptions, setInterestedInRemoteOptions] = useState();

  /* useEffect to run once component is mounted */
  useEffect(() => {
    /*
     * get user profile
     *
     */
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

    /*
     * get all competency options
     *
     * competency options for drop down
     */
    const getCompetencyOptions = async () => {
      try {
        let url = backendAddress + "api/option/getCompetency";
        let result = await axios.get(url);
        await setCompetencyOptions(result.data);
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
            title: result.data[i].description.en,
            value: result.data[i].id,
            children: []
          };

          dataTree.push(parent);
          // loop through skills in each category
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

    /*
     * get saved skills from profile
     *
     * generate an array of skill ids saved in profile
     */
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

    /*
     * get saved mentorship from profile
     *
     * generate an array of mentorship skill ids saved in profile
     */
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

    const getDevelopmentalGoalOptions = async () => {
      try {
        let url = backendAddress + "api/option/getDevelopmentalGoals";
        let result = await axios.get(url);
        await setDevelopmentalGoalOptions(result.data);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    const getSavedDevelopmentalGoals = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];
        console.log(result.data.developmentalGoals);
        for (let i = 0; i < result.data.developmentalGoals.length; i++) {
          selected.push(result.data.developmentalGoals[i].id);
        }
        await setSavedDevelopmentalGoals(selected);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    // const getDevelopmentalGoalOptions = async () => {
    //   try {
    //     let url = backendAddress + "api/option/getDevelopmentalGoals";
    //     let result = await axios.get(url);
    //     await setDevelopmentalGoalOptions(result.data);
    //     return 1;
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // };

    /* get substantive level options */
    const getInterestedInRemoteOptions = () => {
      const options = [
        {
          key: true,
          text: "Yes"
        },
        {
          key: false,
          text: "No"
        }
      ];
      setInterestedInRemoteOptions(options);
    };

    // const getProficiencyOptions = () => {
    //   const proficiency = [
    //     { key: "A", value: "A", text: "A" },
    //     { key: "B", value: "B", text: "B" },
    //     { key: "C", value: "C", text: "C" },
    //     { key: "E", value: "E", text: "E" },
    //     { key: "X", value: "X", text: "X" }
    //   ];
    //   setProficiencyOptions(proficiency);
    // };

    /* get all required data component */

    const getAllData = async () => {
      try {
        await getProfileInfo();
        await getSkillOptions();
        await getCompetencyOptions();
        await getSavedCompetencies();
        await getSavedSkills();
        await getSavedMentorshipSkill();
        await getDevelopmentalGoalOptions();
        await getSavedDevelopmentalGoals();
        await getInterestedInRemoteOptions();
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
    <PersonalGrowthFormView
      profileInfo={profileInfo}
      skillOptions={skillOptions}
      competencyOptions={competencyOptions}
      savedCompetencies={savedCompetencies}
      savedSkills={savedSkills}
      savedMentorshipSkills={savedMentorshipSkills}
      developmentalGoalOptions={developmentalGoalOptions}
      savedDevelopmentalGoals={savedDevelopmentalGoals}
      interestedInRemoteOptions={interestedInRemoteOptions}
      load={load}
    />
  );
}

export default PersonalGrowthForm;
