import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { IntlPropType } from "../../../customPropTypes";
import PersonalGrowthFormView from "./PersonalGrowthFormView";
import config from "../../../config";

const { backendAddress } = config;

/**
 *  Personal Growth Form(props)
 *  Controller for the PersonalGrowthFormView.
 *  It gathers the required data for rendering the component
 */
const PersonalGrowthForm = ({ formType, intl }) => {
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
  const [networkErrors, setNetworkErrors] = useState([]);

  // Get current language code
  const locale = intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  /**
   * Get saved Developmental Goals
   *
   * get saved Developmental Goals from profile
   */
  const getSavedDevelopmentalGoals = () => {
    const selected = [];

    // Generate and array of ID's of save locations
    for (let i = 0; i < profileInfo.developmentalGoals.length; i += 1) {
      selected.push(profileInfo.developmentalGoals[i].id);
    }

    setSavedDevelopmentalGoals(selected);
  };

  /**
   * Get Saved Relocation Locations
   *
   * get saved Relocation Locations from profile
   */
  const getSavedRelocationLocations = () => {
    const selected = [];

    // Generate and array of ID's of save locations
    for (let i = 0; i < profileInfo.relocationLocations.length; i += 1) {
      selected.push(profileInfo.relocationLocations[i].locationId);
    }

    setSavedRelocationLocations(selected);
  };

  /**
   * Get User Profile
   */
  const getProfileInfo = async () => {
    try {
      const url = `${backendAddress}api/private/profile/${localStorage.getItem(
        "userId"
      )}`;
      const result = await axios.get(url);
      setProfileInfo(result.data);
      return 1;
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      throw new Error(error);
    }
  };

  /**
   * Get Developmental Goal Options
   *
   * get a list of developmental goal options for treeSelect dropdown
   */
  const getDevelopmentalGoalOptions = useCallback(async () => {
    try {
      const url = `${backendAddress}api/option/getDevelopmentalGoals`;
      const result = await axios.get(url);
      const dataTree = [];

      // Generate the data format required for treeSelect
      for (let i = 0; i < result.data.length; i += 1) {
        const goal = {
          title: result.data[i].description[locale],
          key: result.data[i].id,
        };
        dataTree.push(goal);
      }
      setDevelopmentalGoalOptions(dataTree);
      return 1;
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      throw new Error(error);
    }
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
        key: true,
        text: locale === "fr" ? "Oui" : "Yes",
      },
      {
        key: false,
        text: locale === "fr" ? "Non" : "No",
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
    try {
      const url = `${backendAddress}api/option/getWillingToRelocateTo`;
      const result = await axios.get(url);
      const dataTree = [];

      // Generate the data format required for treeSelect
      for (let i = 0; i < result.data.length; i += 1) {
        const location = {
          title: result.data[i].description[locale],
          key: result.data[i].id,
        };
        dataTree.push(location);
      }

      setRelocationOptions(dataTree);
      return 1;
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      throw new Error(error);
    }
  }, [locale]);

  /**
   * Get Saved Looking For New Job
   *
   * get Saved Looking For New Job from user profile
   */
  const getLookingForNewJobOptions = useCallback(async () => {
    try {
      const url = `${backendAddress}api/option/getLookingForANewJob`;
      const result = await axios.get(url);
      const dataTree = [];

      // Generate the data format required for dropdown
      for (let i = 0; i < result.data.length; i += 1) {
        const goal = {
          title: result.data[i].description[locale],
          key: result.data[i].id,
        };
        dataTree.push(goal);
      }

      setLookingForNewJobOptions(dataTree);
      return 1;
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      throw new Error(error);
    }
  }, [locale]);

  /**
   * Get Career Mobility Options
   *
   * get all dropdown options for Career Mobility
   */
  const getCareerMobilityOptions = useCallback(async () => {
    try {
      const url = `${backendAddress}api/option/getCareerMobility`;
      const result = await axios.get(url);
      const dataTree = [];

      // Generate the data format required for dropdown
      for (let i = 0; i < result.data.length; i += 1) {
        const goal = {
          title: result.data[i].description[locale],
          key: result.data[i].id,
        };
        dataTree.push(goal);
      }

      setCareerMobilityOptions(dataTree);
      return 1;
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      throw new Error(error);
    }
  }, [locale]);

  /**
   * Get Talent Matrix Result Options
   *
   * get all dropdown options for Talent Matrix Results
   */
  const getTalentMatrixResultOptions = useCallback(async () => {
    try {
      const url = `${backendAddress}api/option/getTalentMatrixResult`;
      const result = await axios.get(url);
      const dataTree = [];

      // Generate the data format required for dropdown
      for (let i = 0; i < result.data.length; i += 1) {
        const goal = {
          title: result.data[i].description[locale],
          key: result.data[i].id,
        };
        dataTree.push(goal);
      }

      setTalentMatrixResultOptions(dataTree);
      return 1;
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      throw new Error(error);
    }
  }, [locale]);

  // useEffect when profileInfo changes (extracts info from the profileInfo object)
  useEffect(() => {
    if (profileInfo) {
      const {
        lookingForNewJob,
        talentMatrixResult,
        careerMobility,
        exFeeder,
      } = profileInfo;

      getSavedDevelopmentalGoals();
      getSavedRelocationLocations();
      setSavedLookingForNewJob(
        lookingForNewJob ? lookingForNewJob.id : undefined
      );
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
      .catch(error => {
        setLoad(false);
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [
    getCareerMobilityOptions,
    getDevelopmentalGoalOptions,
    getInterestedInRemoteOptions,
    getLookingForNewJobOptions,
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
      networkErrors={networkErrors}
    />
  );
};

PersonalGrowthForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  intl: IntlPropType,
};
PersonalGrowthForm.defaultProps = {
  intl: undefined,
};

export default injectIntl(PersonalGrowthForm);
