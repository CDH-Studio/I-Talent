import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import handleError from "../../../functions/handleError";
import useAxios from "../../../utils/useAxios";
import TalentFormView from "./TalentFormView";

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
const TalentForm = ({ formType }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [skillOptions, setSkillOptions] = useState([]);
  const [competencyOptions, setCompetencyOptions] = useState([]);
  const [load, setLoad] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);
  const [savedCompetencies, setSavedCompetencies] = useState([]);
  const [savedSkills, setSavedSkills] = useState([]);
  const [savedMentorshipSkills, setSavedMentorshipSkills] = useState([]);

  // get current language code
  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);
  const axios = useAxios();
  const location = useLocation();
  const history = useHistory();

  /**
   * Get user profile
   */
  const getProfileInfo = useCallback(async () => {
    const result = await axios.get(
      `api/profile/private/${id}?language=${locale}`
    );

    setProfileInfo(result.data);
  }, [axios, id, locale]);

  /**
   * Get all competency options
   *
   * competency options for drop down
   */
  const getCompetencyOptions = useCallback(async () => {
    const result = await axios.get(
      `api/option/competencies?language=${locale}`
    );

    setCompetencyOptions(result.data);
  }, [axios, locale]);

  /**
   * Get all skill options
   *
   * generate the dataTree of skills and skill categories for the TreeSelect
   */
  const getSkillOptions = useCallback(async () => {
    const [categoriesResult, skillsResults] = await Promise.all([
      axios.get(`api/option/categories?language=${locale}`),
      axios.get(`api/option/skills?language=${locale}`),
    ]);

    console.log(categoriesResult);

    // Loop through all skill categories
    const dataTree = categoriesResult.data.map((category) => {
      const options = [];

      skillsResults.data.forEach((skill) => {
        if (skill.categoryId === category.value) {
          options.push({
            label: `${category.label}: ${skill.label}`,
            value: skill.value,
          });
        }
      });

      return {
        label: category.label,
        options,
      };
    });
    console.log("dataTree", dataTree);

    setSkillOptions(dataTree);
  }, [axios, locale]);

  /**
   * Get saved competencies
   *
   * get saved competencies from profile
   */
  const getSavedCompetencies = () => {
    setSavedCompetencies(profileInfo.competencies.map((i) => i.id));
  };

  /**
   * Get saved skills from profile
   *
   * generate an array of skill ids saved in profile
   */
  const getSavedSkills = () => {
    setSavedSkills(profileInfo.skills.map((i) => i.id));
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

  /**
   * Get default form tab
   *
   * get the default selected form tab based on url query params
   */
  const getDefaultFormTab = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    setCurrentTab(searchParams.get("tab"));
  }, [location.search]);

  // useEffect when url path is updated
  useEffect(() => {
    getDefaultFormTab();
  }, [getDefaultFormTab, location]);

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
      .catch((error) => {
        setLoad(false);
        handleError(error, "redirect", history);
      });
  }, [getCompetencyOptions, getProfileInfo, getSkillOptions, history]);

  return (
    <TalentFormView
      competencyOptions={competencyOptions}
      currentTab={currentTab}
      formType={formType}
      load={load}
      profileInfo={profileInfo}
      savedCompetencies={savedCompetencies}
      savedMentorshipSkills={savedMentorshipSkills}
      savedSkills={savedSkills}
      skillOptions={skillOptions}
      userId={id}
    />
  );
};

TalentForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default TalentForm;
