import React, { useState, useEffect } from "react";

import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import handleError from "../../../functions/handleError";
import QualificationsFormView from "./QualificationsFormView";
import config from "../../../config";

const { backendAddress } = config;

/**
 *  QualificationsForm
 *  Controller for the QualificationsFormView.
 *  It gathers the required data for rendering the component
 */
const QualificationsForm = ({ formType }) => {
  // Define States
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [savedEducation, setSavedEducation] = useState([]);
  const [savedExperience, setSavedExperience] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);

  const history = useHistory();

  /**
   * Get User Profile
   */
  const getProfileInfo = async () => {
    try {
      const url = `${backendAddress}api/profile/private/${localStorage.getItem(
        "userId"
      )}`;
      const result = await axios.get(url);
      setProfileInfo(result.data);
      setLoad(true);
      return 1;
    } catch (error) {
      setLoad(false);
      throw error;
    }
  };

  /**
   * Get Saved Education Information
   *
   * get saved education items
   */
  const getSavedEducation = () => {
    const selected = [];

    // Generate an array of education items
    for (let i = 0; i < profileInfo.education.length; i += 1) {
      const child = {
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
    const selected = [];

    // Generate an array of education items
    for (let i = 0; i < profileInfo.careerSummary.length; i += 1) {
      const child = {
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

    for (let i = 0; i < profileInfo.projects.length; i += 1) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

  // useEffect to run once component is mounted
  useEffect(() => {
    /* Get all required data component */
    getProfileInfo().catch((error) => handleError(error, "redirect"));
  }, []);

  return (
    <QualificationsFormView
      profileInfo={profileInfo}
      savedEducation={savedEducation}
      savedExperience={savedExperience}
      savedProjects={savedProjects}
      formType={formType}
      load={load}
      history={history}
    />
  );
};

QualificationsForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default QualificationsForm;
