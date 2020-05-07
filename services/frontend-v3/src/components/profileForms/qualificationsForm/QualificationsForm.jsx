import React, { useState, useEffect } from "react";
import QualificationsFormView from "./QualificationsFormView";
import axios from "axios";
import config from "../../../config";
import moment from "moment";
const { backendAddress } = config;

/**
 *  QualificationsForm
 *  Controller for the QualificationsFormView.
 *  It gathers the required data for rendering the component
 */
const QualificationsForm = (props) => {
  // Define States
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [savedEducation, setSavedEducation] = useState();
  const [savedExperience, setSavedExperience] = useState();
  const [savedProjects, setSavedProjects] = useState();

  /**
   * Get User Profile
   */
  const getProfileInfo = async () => {
    try {
      let url =
        backendAddress +
        "api/private/profile/" +
        localStorage.getItem("userId");
      let result = await axios.get(url);
      setProfileInfo(result.data);
      setLoad(true);
      return 1;
    } catch (error) {
      setLoad(false);
      throw new Error(error);
    }
  };

  /**
   * Get Saved Education Information
   *
   * get saved education items
   */
  const getSavedEducation = () => {
    let selected = [];

    // Generate an array of education items
    for (let i = 0; i < profileInfo.education.length; i++) {
      let child = {
        school: profileInfo.education[i].school.id,
        diploma: profileInfo.education[i].diploma.id,
        startDate: moment(profileInfo.education[i].startDate.en),
        endDate: profileInfo.education[i].endDate.en
          ? moment(profileInfo.education[i].endDate.en)
          : null,
      };
      selected.push(child);
    }

    setSavedEducation(selected);
  };

  /**
   * Get Saved Experience Information
   *
   * get saved experience items
   */
  const getSavedExperience = () => {
    let selected = [];

    // Generate an array of education items
    for (let i = 0; i < profileInfo. careerSummary.length; i++) {
      let child = {
        header: profileInfo.careerSummary[i].header,
        subheader: profileInfo.careerSummary[i].subheader,
        content: profileInfo.careerSummary[i].content,
        startDate: moment(profileInfo.careerSummary[i].startDate),
        endDate: profileInfo.careerSummary[i].endDate
          ? moment(profileInfo.careerSummary[i].endDate)
          : null,
      };
      selected.push(child);
    }

    setSavedExperience(selected);
  };

  /**
   * Get Saved Projects
   *
   * get saved projects
   */
  const getSavedProjects = () => {
    const selected = [];

    for (let i = 0; i < profileInfo.projects.length; i++) {
      selected.push(profileInfo.projects[i].text);
    }
    setSavedProjects(selected);
  };

  // useEffect when profileInfo changes (extracts info from the profileInfo object)
  useEffect(() => {
    if (profileInfo) {
      getSavedEducation();
      getSavedExperience();
      getSavedProjects();
    }
  }, [profileInfo]);

  // useEffect to run once component is mounted
  useEffect(() => {
    /* Get all required data component */
    getProfileInfo();
  }, []);

  return (
    <QualificationsFormView
      profileInfo={profileInfo}
      savedEducation={savedEducation}
      savedExperience={savedExperience}
      savedProjects={savedProjects}
      formType={props.formType}
      load={load}
    />
  );
};

export default QualificationsForm;
