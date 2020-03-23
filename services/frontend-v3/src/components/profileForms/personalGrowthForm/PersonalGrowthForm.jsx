import React, { useState, useEffect } from "react";
import PersonalGrowthFormView from "./PersonalGrowthFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
function PersonalGrowthForm() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [developmentalGoalOptions, setDevelopmentalGoalOptions] = useState();
  const [savedDevelopmentalGoals, setSavedDevelopmentalGoals] = useState();
  const [interestedInRemoteOptions, setInterestedInRemoteOptions] = useState();
  const [relocationOptions, setRelocationOptions] = useState();
  const [savedRelocationLocations, setSavedRelocationLocations] = useState();
  const [lookingForNewJobOptions, setLookingForNewJobOptions] = useState();
  const [savedLookingForNewJob, setSavedLookingForNewJob] = useState();

  /* useEffect to run once component is mounted */
  useEffect(() => {
    /*
     * get user profile
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
     * get saved competencies
     *
     * get saved competencies from profile
     */
    const getDevelopmentalGoalOptions = async () => {
      try {
        let url = backendAddress + "api/option/getDevelopmentalGoals";
        let result = await axios.get(url);
        console.log(result);
        let dataTree = [];
        for (var i = 0; i < result.data.length; i++) {
          var goal = {
            title: result.data[i].description.en,
            key: result.data[i].id
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
     * get saved competencies
     *
     * get saved competencies from profile
     */
    const getSavedDevelopmentalGoals = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];
        console.log(result.data.developmentalGoals);
        for (let i = 0; i < result.data.developmentalGoals.length; i++) {
          selected.push(result.data.developmentalGoals[i].id);
        }
        await setSavedDevelopmentalGoals(selected);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* get substantive level options */
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

    const getRelocationOptions = async () => {
      try {
        let url = backendAddress + "api/option/getWillingToRelocateTo";
        let result = await axios.get(url);
        let dataTree = [];
        console.log(result);

        // loop through each relocation option
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

    const getSavedRelocationLocations = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        let selected = [];
        console.log(result.data.developmentalGoals);
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
     * get saved competencies
     *
     * get saved competencies from profile
     */
    const getLookingForNewJobOptions = async () => {
      try {
        let url = backendAddress + "api/option/getLookingForANewJob";
        let result = await axios.get(url);
        console.log(result);
        let dataTree = [];
        for (var i = 0; i < result.data.length; i++) {
          var goal = {
            title: result.data[i].description.en,
            key: result.data[i].id
          };
          dataTree.push(goal);
        }
        console.log(dataTree);
        await setLookingForNewJobOptions(dataTree);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    const getSavedLookingForNewJob = async () => {
      try {
        let url =
          backendAddress + "api/profile/" + localStorage.getItem("userId");
        let result = await axios.get(url);
        console.log(result);
        await setSavedLookingForNewJob(result.data.lookingForNewJob.id);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* get all required data component */

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
      load={load}
    />
  );
}

export default PersonalGrowthForm;
