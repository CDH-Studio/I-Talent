/* eslint-disable react-hooks/exhaustive-deps */
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
  const [diplomas, setDiplomas] = useState(null);
  const [schools, setSchools] = useState(null);
  const [attachmentNamesEdu, setAttachmentNamesEdu] = useState(null);
  const [attachmentNamesExp, setAttachmentNamesExp] = useState(null);

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

  const getBackendInfo = useCallback(async () => {
    try {
      const [
        profileQuery,
        diplomasQuery,
        schoolsQuery,
        attachmentNamesEduQuery,
        attachmentNamesExpQuery,
      ] = await Promise.all([
        axios.get(`api/profile/private/${id}?language=${locale}`),
        axios.get(`api/option/diplomas?language=${locale}`),
        axios.get(`api/option/schools?language=${locale}`),
        axios.get(`api/option/attachmentNames?language=${locale}&type=Edu`),
        axios.get(`api/option/attachmentNames?language=${locale}&type=Exp`),
      ]);
      setProfileInfo(profileQuery.data);
      setDiplomas(diplomasQuery.data);
      setSchools(schoolsQuery.data);
      setAttachmentNamesEdu(attachmentNamesEduQuery.data);
      setAttachmentNamesExp(attachmentNamesExpQuery.data);
      setLoad(true);
    } catch (error) {
      setLoad(false);
      throw error;
    }
  });

  /**
   * Get User Profile
   */
  const getProfileInfo = useCallback(async () => {}, [id, locale]);

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
  const getDefaultFormTab = () => {
    const searchParams = new URLSearchParams(location.search);
    setCurrentTab(searchParams.get("tab"));
  };

  useEffect(() => {
    getDefaultFormTab();
    getBackendInfo().catch((error) => handleError(error, "redirect"));
    if (profileInfo) {
      getSavedEducation();
      getSavedExperience();
      getSavedProjects();
    }
  }, [location, getProfileInfo, profileInfo]);

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
      attachmentNamesTypeEdu={attachmentNamesEdu}
      attachmentNamesTypeExp={attachmentNamesExp}
      diplomas={diplomas}
      schools={schools}
    />
  );
};

QualificationsForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default QualificationsForm;
