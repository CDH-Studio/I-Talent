import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import PersonalGrowthFormView from "./PersonalGrowthFormView";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;

/**
 *  Personal Growth Form(props)
 *  Controller for the PersonalGrowthFormView.
 *  It gathers the required data for rendering the component
 */
const PersonalGrowthForm = ({ formType }) => {
  // Define States
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [developmentalGoalOptions, setDevelopmentalGoalOptions] = useState([]);
  const [savedDevelopmentalGoals, setSavedDevelopmentalGoals] = useState([]);
  const [interestedInRemoteOptions, setInterestedInRemoteOptions] = useState(
    []
  );
  const [relocationOptions, setRelocationOptions] = useState([]);
  const [savedRelocationLocations, setSavedRelocationLocations] = useState([]);
  const [lookingForNewJobOptions, setLookingForNewJobOptions] = useState([]);
  const [savedLookingForNewJob, setSavedLookingForNewJob] = useState(undefined);
  const [careerMobilityOptions, setCareerMobilityOptions] = useState([]);
  const [savedCareerMobility, setSavedCareerMobility] = useState(undefined);
  const [talentMatrixResultOptions, setTalentMatrixResultOptions] = useState(
    []
  );
  const [savedTalentMatrixResult, setSavedTalentMatrixResult] = useState(
    undefined
  );
  const [savedExFeederBool, setSavedExFeederBool] = useState(undefined);

  // Get current language code
  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);

  const history = useHistory();

  /**
   * Get saved Developmental Goals
   *
   * get saved Developmental Goals from profile
   */
  const getSavedDevelopmentalGoals = () => {
    setSavedDevelopmentalGoals(profileInfo.developmentalGoals.map((i) => i.id));
  };

  /**
   * Get Saved Relocation Locations
   *
   * get saved Relocation Locations from profile
   */
  const getSavedRelocationLocations = () => {
    setSavedRelocationLocations(
      profileInfo.relocationLocations.map((i) => i.id)
    );
  };

  /**
   * Get User Profile
   */
  const getProfileInfo = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/profile/private/${id}?language=${locale}`
    );

    setProfileInfo(result.data);
  }, [id, locale]);

  /**
   * Get Developmental Goal Options
   *
   * get a list of developmental goal options for treeSelect dropdown
   */
  const getDevelopmentalGoalOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/developmentalGoals?language=${locale}`
    );

    setDevelopmentalGoalOptions(result.data);
  }, [locale]);

  /**
   * Get Interested In Remote Options
   *
   * get Interested In Remote Options
   * TODO: Generate this list from API call to back end
   */
  const getInterestedInRemoteOptions = useCallback(() => {
    const options = [
      {
        key: "true",
        text: locale === "ENGLISH" ? "Yes" : "Oui",
      },
      {
        key: "false",
        text: locale === "ENGLISH" ? "No" : "Non",
      },
    ];
    setInterestedInRemoteOptions(options);
  }, [locale]);

  /**
   * Get Relocation Options
   *
   * get a list of Relocation Options for dropdown treeSelect
   */
  const getRelocationOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/locations?language=${locale}`
    );

    setRelocationOptions(result.data);
  }, [locale]);

  /**
   * Get Saved Looking For New Job
   *
   * get Saved Looking For New Job from user profile
   */
  const getLookingForNewJobOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/lookingJobs?language=${locale}`
    );

    setLookingForNewJobOptions(result.data);
  }, [locale]);

  /**
   * Get Career Mobility Options
   *
   * get all dropdown options for Career Mobility
   */
  const getCareerMobilityOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/careerMobilities?language=${locale}`
    );

    setCareerMobilityOptions(result.data);
  }, [locale]);

  /**
   * Get Talent Matrix Result Options
   *
   * get all dropdown options for Talent Matrix Results
   */
  const getTalentMatrixResultOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/talentMatrixResults?language=${locale}`
    );

    setTalentMatrixResultOptions(result.data);
  }, [locale]);

  // useEffect when profileInfo changes (extracts info from the profileInfo object)
  useEffect(() => {
    if (profileInfo) {
      const {
        lookingJob,
        talentMatrixResult,
        careerMobility,
        exFeeder,
      } = profileInfo;

      getSavedDevelopmentalGoals();
      getSavedRelocationLocations();
      setSavedLookingForNewJob(lookingJob ? lookingJob.id : undefined);
      setSavedTalentMatrixResult(
        talentMatrixResult ? talentMatrixResult.id : undefined
      );
      setSavedCareerMobility(careerMobility ? careerMobility.id : undefined);
      setSavedExFeederBool(exFeeder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

  // useEffect when locale changes
  useEffect(() => {
    getInterestedInRemoteOptions();

    // Get all required data component
    Promise.all([
      getProfileInfo(),
      getDevelopmentalGoalOptions(),
      getRelocationOptions(),
      getLookingForNewJobOptions(),
      getCareerMobilityOptions(),
      getTalentMatrixResultOptions(),
    ])
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        handleError(error, "redirect");
      });
  }, [
    getCareerMobilityOptions,
    getDevelopmentalGoalOptions,
    getInterestedInRemoteOptions,
    getLookingForNewJobOptions,
    getProfileInfo,
    getRelocationOptions,
    getTalentMatrixResultOptions,
  ]);

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
      formType={formType}
      load={load}
      history={history}
      userId={id}
    />
  );
};

PersonalGrowthForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default PersonalGrowthForm;
