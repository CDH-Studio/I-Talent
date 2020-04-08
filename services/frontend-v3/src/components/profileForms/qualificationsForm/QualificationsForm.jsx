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
     * Get Saved Relocation Locations
     *
     * get saved Relocation Locations from profile
     */
    const getSavedEducation = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];

        // generate and array of ID's of save locations
        for (let i = 0; i < result.data.education.length; i++) {
          console.log(result.data.education[i]);
          let child = {
            school: result.data.education[i].school.id,
            diploma: result.data.education[i].diploma.id,
            startDate: moment(result.data.education[i].startDate.en),
            endDate: result.data.education[i].endDate.en
              ? moment(result.data.education[i].endDate.en)
              : null,
          };
          selected.push(child);
          console.log(child);
        }
        console.log(selected);
        await setSavedEducation(selected);
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
      load={load}
    />
  );
}

export default QualificationsForm;
