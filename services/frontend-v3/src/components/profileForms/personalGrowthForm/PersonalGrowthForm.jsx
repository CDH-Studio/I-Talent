import React, { useState, useEffect } from "react";
import PersonalGrowthFormView from "./PersonalGrowthFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

/**
 *  Personal Growth Form(props)
 *  Controller for the PersonalGrowthFormView.
 *  It gathers the required data for rendering the component
 */
function PersonalGrowthForm(props) {
  // Define States
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [developmentalGoalOptions, setDevelopmentalGoalOptions] = useState();
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
     * Get Developmental Goal Options
     *
     * get a list of developmental goal options for treeSelect dropdown
     */
    const getDevelopmentalGoalOptions = async () => {
      try {
        let url = backendAddress + "api/option/getDevelopmentalGoals";
        let result = await axios.get(url);
        let dataTree = [];

        // Generate the data format required for treeSelect
        for (var i = 0; i < result.data.length; i++) {
          var goal = {
            title: result.data[i].description.en,
            key: result.data[i].id,
          };
          dataTree.push(goal);
        }
        await setDevelopmentalGoalOptions(dataTree);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /*
     * Get saved Developmental Goals
     *
     * get saved Developmental Goals from profile
     */
    const getSavedDevelopmentalGoals = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];

        // generate and array of ID's of save locations
        for (let i = 0; i < result.data.developmentalGoals.length; i++) {
          selected.push(result.data.developmentalGoals[i].id);
        }

        await setSavedDevelopmentalGoals(selected);
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
          text: "Yes",
        },
        {
          key: false,
          text: "No",
        },
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
            key: result.data[i].id,
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
            key: result.data[i].id,
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
            key: result.data[i].id,
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
            key: result.data[i].id,
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
        await getDevelopmentalGoalOptions();
        await getSavedDevelopmentalGoals();
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
    <PersonalGrowthFormView
      profileInfo={profileInfo}
      developmentalGoalOptions={developmentalGoalOptions}
      savedDevelopmentalGoals={savedDevelopmentalGoals}
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
      formType={props.formType}
      load={load}
    />
  );
}

export default PersonalGrowthForm;
