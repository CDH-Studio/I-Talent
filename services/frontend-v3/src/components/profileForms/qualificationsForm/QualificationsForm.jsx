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
function QualificationsForm() {
  // Define States
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [savedEducation, setSavedEducation] = useState();
  const [savedExperience, setSavedExperience] = useState();
  const [savedProjects, setSavedProjects] = useState();

  /* useEffect to run once component is mounted */
  useEffect(() => {
    /*
     * Get User Profile
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
     * Get Saved Education Information
     *
     * get saved education items
     */
    const getSavedEducation = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];

        // generate an array of education items
        for (let i = 0; i < result.data.education.length; i++) {
          let child = {
            school: result.data.education[i].school.id,
            diploma: result.data.education[i].diploma.id,
            startDate: moment(result.data.education[i].startDate.en),
            endDate: result.data.education[i].endDate.en
              ? moment(result.data.education[i].endDate.en)
              : null,
          };
          selected.push(child);
        }
        await setSavedEducation(selected);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Saved Experience Information
     *
     * get saved experience items
     */
    const getSavedExperience = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];

        // generate an array of education items
        for (let i = 0; i < result.data.careerSummary.length; i++) {
          let child = {
            header: result.data.careerSummary[i].header,
            subheader: result.data.careerSummary[i].subheader,
            content: result.data.careerSummary[i].content,
            startDate: moment(result.data.careerSummary[i].startDate),
            endDate: result.data.careerSummary[i].endDate
              ? moment(result.data.careerSummary[i].endDate)
              : null,
          };
          selected.push(child);
        }

        await setSavedExperience(selected);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Saved Projects
     *
     * get saved projects
     */
    const getSavedProjects = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        const selected = [];

        for (let i = 0; i < result.data.projects.length; i++) {
          selected.push(result.data.projects[i].text);
        }
        await setSavedProjects(selected);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* Get all required data component */
    const getAllData = async () => {
      try {
        await getProfileInfo();
        await getSavedEducation();
        await getSavedExperience();
        await getSavedProjects();
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
    <QualificationsFormView
      profileInfo={profileInfo}
      savedEducation={savedEducation}
      savedExperience={savedExperience}
      savedProjects={savedProjects}
      load={load}
    />
  );
}

export default QualificationsForm;
