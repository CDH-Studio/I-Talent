import React, { useState, useEffect } from "react";
import QualificationsFormView from "./QualificationsFormView";
import axios from "axios";
import config from "../../../config";
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
  const [diplomaOptions, setDiplomaOptions] = useState();
  const [schoolOptions, setSchoolOptions] = useState();
  const [savedEducation, setSavedEducation] = useState();

  const [savedDevelopmentalGoals, setSavedDevelopmentalGoals] = useState();
  const [interestedInRemoteOptions, setInterestedInRemoteOptions] = useState();
  const [relocationOptions, setRelocationOptions] = useState();
  const [savedRelocationLocations, setSavedRelocationLocations] = useState();
  const [lookingForNewJobOptions, setLookingForNewJobOptions] = useState();
  const [savedLookingForNewJob, setSavedLookingForNewJob] = useState();
  const [careerMobilityOptions, setCareerMobilityOptions] = useState();
  const [savedCareerMobility, setSavedCareerMobility] = useState();
  const [talentMatrixResultOptions, setTalentMatrixResultOptions] = useState();
  const [savedTalentMatrixResult, setSavedTalentMatrixResult] = useState();
  const [savedExFeederBool, setSavedExFeederBool] = useState();

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
     * Get Diploma Options
     *
     * get a list of diploma options for dropdown
     */
    const getDiplomaOptions = async () => {
      try {
        let url = backendAddress + "api/option/getDiploma";
        let result = await axios.get(url);
        let dataTree = [];

        console.log(result);

        // Generate the data format required for treeSelect
        for (var i = 0; i < result.data.length; i++) {
          var goal = {
            title: result.data[i].description.en,
            key: result.data[i].id
          };
          dataTree.push(goal);
        }
        await setDiplomaOptions(dataTree);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get School Options
     *
     * get a list of diploma options for dropdown
     */
    const getSchoolOptions = async () => {
      try {
        let url = backendAddress + "api/option/getSchool";
        let result = await axios.get(url);
        let dataTree = [];

        console.log(result);

        // Generate the data format required for treeSelect
        for (var i = 0; i < result.data.length; i++) {
          var goal = {
            title: result.data[i].description,
            key: result.data[i].id
          };
          dataTree.push(goal);
        }
        await setSchoolOptions(dataTree);
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
          let child = {
            school: result.data.education[i].school.id,
            diploma: result.data.education[i].diploma.id
          };
          selected.push(child);
        }
        console.log(selected);
        await setSavedEducation(selected);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Interested In Remote Options
     *
     * get Interested In Remote Options
     * TODO: Generate this list from API call to back end
     */
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

    /*
     * Get Relocation Options
     *
     * get a list of Relocation Options for dropdown treeSelect
     */
    const getRelocationOptions = async () => {
      try {
        let url = backendAddress + "api/option/getWillingToRelocateTo";
        let result = await axios.get(url);
        let dataTree = [];

        // Generate the data format required for treeSelect
        for (var i = 0; i < result.data.length; i++) {
          var location = {
            title: result.data[i].description.en,
            key: result.data[i].id
          };
          dataTree.push(location);
        }

        await setRelocationOptions(dataTree);
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
    const getSavedRelocationLocations = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];

        // generate and array of ID's of save locations
        for (let i = 0; i < result.data.relocationLocations.length; i++) {
          selected.push(result.data.relocationLocations[i].locationId);
        }

        await setSavedRelocationLocations(selected);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Saved Looking For New Job
     *
     * get Saved Looking For New Job from user profile
     */
    const getLookingForNewJobOptions = async () => {
      try {
        let url = backendAddress + "api/option/getLookingForANewJob";
        let result = await axios.get(url);
        let dataTree = [];

        // Generate the data format required for dropdown
        for (var i = 0; i < result.data.length; i++) {
          var goal = {
            title: result.data[i].description.en,
            key: result.data[i].id
          };
          dataTree.push(goal);
        }

        await setLookingForNewJobOptions(dataTree);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Saved Looking For New Job
     *
     * get Saved Looking For New Job from user profile
     */
    const getSavedLookingForNewJob = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);

        // if id is not found set to "undefined" so dropdown defaults to placeholder
        let savedValue = result.data.lookingForNewJob
          ? result.data.lookingForNewJob.id
          : undefined;

        await setSavedLookingForNewJob(savedValue);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Career Mobility Options
     *
     * get all dropdown options for Career Mobility
     */
    const getCareerMobilityOptions = async () => {
      try {
        let url = backendAddress + "api/option/getCareerMobility";
        let result = await axios.get(url);
        let dataTree = [];

        // Generate the data format required for dropdown
        for (var i = 0; i < result.data.length; i++) {
          var goal = {
            title: result.data[i].description.en,
            key: result.data[i].id
          };
          dataTree.push(goal);
        }

        await setCareerMobilityOptions(dataTree);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Saved Career Mobility
     *
     * get saved Saved Career Mobility from user profile
     */
    const getSavedCareerMobility = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);

        // if id is not found set to "undefined" so dropdown defaults to placeholder
        let savedValue = result.data.careerMobility.id
          ? result.data.careerMobility.id
          : undefined;

        await setSavedCareerMobility(savedValue);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Talent Matrix Result Options
     *
     * get all dropdown options for Talent Matrix Results
     */
    const getTalentMatrixResultOptions = async () => {
      try {
        let url = backendAddress + "api/option/getTalentMatrixResult";
        let result = await axios.get(url);
        let dataTree = [];

        // Generate the data format required for dropdown
        for (var i = 0; i < result.data.length; i++) {
          var goal = {
            title: result.data[i].description.en,
            key: result.data[i].id
          };
          dataTree.push(goal);
        }

        await setTalentMatrixResultOptions(dataTree);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Saved Talent Matrix Result
     *
     * get saved Talent Matrix Result from user profile
     */
    const getSavedTalentMatrixResult = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);

        // if id is not found set to "undefined" so dropdown defaults to placeholder
        let savedValue = result.data.talentMatrixResult.id
          ? result.data.talentMatrixResult.id
          : undefined;

        await setSavedTalentMatrixResult(savedValue);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get Ex Feeder Bool
     *
     * get EX-feeder nomination boolean from user profile
     */
    const getExFeederBool = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        await setSavedExFeederBool(result.data.exFeeder);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* Get all required data component */
    const getAllData = async () => {
      try {
        await getProfileInfo();
        await getDiplomaOptions();
        await getSchoolOptions();
        await getInterestedInRemoteOptions();
        await getRelocationOptions();
        await getSavedRelocationLocations();
        await getLookingForNewJobOptions();
        await getSavedLookingForNewJob();
        await getCareerMobilityOptions();
        await getSavedCareerMobility();
        await getTalentMatrixResultOptions();
        await getSavedTalentMatrixResult();
        await getExFeederBool();
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
  console.log(diplomaOptions);
  return (
    <QualificationsFormView
      profileInfo={profileInfo}
      diplomaOptions={diplomaOptions}
      schoolOptions={schoolOptions}
      savedEducation={savedEducation}
      ///////
      interestedInRemoteOptions={interestedInRemoteOptions}
      relocationOptions={relocationOptions}
      savedRelocationLocations={savedRelocationLocations}
      lookingForNewJobOptions={lookingForNewJobOptions}
      savedLookingForNewJob={savedLookingForNewJob}
      careerMobilityOptions={careerMobilityOptions}
      savedCareerMobility={savedCareerMobility}
      talentMatrixResultOptions={talentMatrixResultOptions}
      savedTalentMatrixResult={savedTalentMatrixResult}
      savedExFeederBool={savedExFeederBool}
      load={load}
    />
  );
}

export default QualificationsForm;
