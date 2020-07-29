/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAxios from "../../../utils/axios-instance";
import TalentFormView from "./TalentFormView";
import handleError from "../../../functions/handleError";

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
  const [savedCompetencies, setSavedCompetencies] = useState([]);
  const [savedSkills, setSavedSkills] = useState([]);
  const [savedMentorshipSkills, setSavedMentorshipSkills] = useState([]);

  // get current language code
  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);
  const axios = useAxios();

  /**
   * Get user profile
   */
  const getProfileInfo = useCallback(async () => {
    const result = await axios.get(
      `api/profile/private/${id}?language=${locale}`
    );
    setProfileInfo(result.data);
  }, [id, locale]);

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
  }, [locale]);

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

    // Loop through all skill categories
    const dataTree = categoriesResult.data.map((category) => {
      const children = [];

      skillsResults.data.forEach((skill) => {
        if (skill.categoryId === category.id) {
          children.push({
            title: `${category.name}: ${skill.name}`,
            value: skill.id,
            key: skill.id,
          });
        }
      });

      return {
        title: category.name,
        value: category.id,
        children,
      };
    });

    setSkillOptions(dataTree);
  }, [locale]);

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
        handleError(error, "redirect");
      });
  }, [getCompetencyOptions, getProfileInfo, getSkillOptions]);

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
      userId={id}
    />
  );
};

TalentForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default TalentForm;
