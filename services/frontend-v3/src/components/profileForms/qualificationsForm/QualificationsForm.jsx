import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import useAxios from "../../../utils/axios-instance";
import handleError from "../../../functions/handleError";
import QualificationsFormView from "./QualificationsFormView";

/**
 *  QualificationsForm
 *  Controller for the QualificationsFormView.
 *  It gathers the required data for rendering the component
 */
const QualificationsForm = ({ formType }) => {
  // Define States
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);
  const [savedEducation, setSavedEducation] = useState();
  const [savedExperience, setSavedExperience] = useState();
  const [savedProjects, setSavedProjects] = useState();

  const { id } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);

  const axios = useAxios();
  const location = useLocation();
  const history = useHistory();

  /**
   * Get User Profile
   */
  const getProfileInfo = useCallback(async () => {
    try {
      const result = await axios.get(
        `api/profile/private/${id}?language=${locale}`
      );
      setProfileInfo(result.data);
      setLoad(true);
    } catch (error) {
      setLoad(false);
      throw error;
    }
  }, [axios, id, locale]);

  /**
   * Get Saved Education Information
   *
   * get saved education items
   */
  const getSavedEducation = () => {
    // Generate an array of education items
    const educations = profileInfo.educations.map((i) => ({
      schoolId: i.school.id,
      diplomaId: i.diploma.id,
      startDate: i.startDate ? moment(i.startDate) : undefined,
      endDate: i.endDate ? moment(i.endDate) : undefined,
      description: i.description,
    }));

    setSavedEducation(educations);
  };

  /**
   * Get Saved Experience Information
   *
   * get saved experience items
   */
  const getSavedExperience = () => {
    // Generate an array of education items
    const selected = profileInfo.experiences.map((i) => ({
      jobTitle: i.jobTitle,
      organization: i.organization,
      description: i.description,
      startDate: i.startDate ? moment(i.startDate) : undefined,
      endDate: i.endDate ? moment(i.endDate) : undefined,
    }));

    setSavedExperience(selected);
  };

  /**
   * Get Saved Projects
   *
   * get saved projects
   */
  const getSavedProjects = () => {
    setSavedProjects(profileInfo.projects);
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
      getSavedEducation();
      getSavedExperience();
      getSavedProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

  // useEffect to run once component is mounted
  useEffect(() => {
    /* Get all required data component */
    getProfileInfo().catch((error) => handleError(error, "redirect"));
  }, [getProfileInfo]);

  return (
    <QualificationsFormView
      profileInfo={profileInfo}
      savedEducation={savedEducation}
      savedExperience={savedExperience}
      savedProjects={savedProjects}
      formType={formType}
      currentTab={currentTab}
      load={load}
      history={history}
      userId={id}
    />
  );
};

QualificationsForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default QualificationsForm;
