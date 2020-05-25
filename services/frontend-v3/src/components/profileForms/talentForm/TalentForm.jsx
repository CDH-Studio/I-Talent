import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import TalentFormView from "./TalentFormView";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
const TalentForm = ({ formType, history }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [skillOptions, setSkillOptions] = useState([]);
  const [competencyOptions, setCompetencyOptions] = useState([]);
  const [load, setLoad] = useState(false);
  const [savedCompetencies, setSavedCompetencies] = useState([]);
  const [savedSkills, setSavedSkills] = useState([]);
  const [savedMentorshipSkills, setSavedMentorshipSkills] = useState([]);

  const dispatch = useDispatch();

  // get current language code
  const { locale } = useSelector(state => state.settings);

  /**
   * Get user profile
   */
  const getProfileInfo = async () => {
    try {
      const url = `${backendAddress}api/profile/private/${localStorage.getItem(
        "userId"
      )}`;
      const result = await axios.get(url);
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
  const getCompetencyOptions = useCallback(async () => {
    try {
      const url = `${backendAddress}api/option/getCompetency`;
      const result = await axios.get(url);
      const options = [];

      // Generate the data for dropdown
      for (let i = 0; i < result.data.length; i += 1) {
        const option = {
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
  }, [locale]);

  /**
   * Get all skill options
   *
   * generate the dataTree of skills and skill categories for the TreeSelect
   */
  const getSkillOptions = useCallback(async () => {
    try {
      const dataTree = [];

      // Get user profile
      const url = `${backendAddress}api/option/getCategory`;
      const result = await axios.get(url);

      // Loop through all skill categories
      for (let i = 0; i < result.data.length; i += 1) {
        const parent = {
          title: result.data[i].description[locale],
          value: result.data[i].id,
          children: [],
        };

        dataTree.push(parent);
        // Loop through skills in each category
        for (let w = 0; w < result.data[i].skills.length; w += 1) {
          const child = {
            title: `${result.data[i].description[locale]}: ${result.data[i].skills[w].description[locale]}`,
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
  }, [locale]);

  /**
   * Get saved competencies
   *
   * get saved competencies from profile
   */
  const getSavedCompetencies = () => {
    const selected = [];
    for (let i = 0; i < profileInfo.competencies.length; i += 1) {
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
    const selected = [];
    for (let i = 0; i < profileInfo.skills.length; i += 1) {
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
    const selected = [];
    for (let i = 0; i < profileInfo.mentorshipSkills.length; i += 1) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // get all required data component
    Promise.all([getProfileInfo(), getSkillOptions(), getCompetencyOptions()])
      .then(() => {
        setLoad(true);
      })
      .catch(error => {
        setLoad(false);
        // eslint-disable-next-line no-console
        console.log(error);
        handleError(error, dispatch, history);
      });
  }, [getCompetencyOptions, getSkillOptions]);

  return (
    <TalentFormView
      profileInfo={profileInfo}
      skillOptions={skillOptions}
      competencyOptions={competencyOptions}
      savedCompetencies={savedCompetencies}
      savedSkills={savedSkills}
      savedMentorshipSkills={savedMentorshipSkills}
      formType={formType}
      load={load}
    />
  );
};

TalentForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default TalentForm;
