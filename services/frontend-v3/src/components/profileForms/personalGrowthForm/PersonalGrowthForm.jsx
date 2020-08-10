/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import useAxios from "../../../utils/axios-instance";

import PersonalGrowthFormView from "./PersonalGrowthFormView";
import handleError from "../../../functions/handleError";

/**
 *  Personal Growth Form(props)
 *  Controller for the PersonalGrowthFormView.
 *  It gathers the required data for rendering the component
 */
const PersonalGrowthForm = ({ formType }) => {
  // Define States
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);
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
  const axios = useAxios();

  // Get current language code
  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);

  const history = useHistory();
  const intl = useIntl();
  const location = useLocation();

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
      `api/profile/private/${id}?language=${locale}`
    );

    setProfileInfo(result.data);
  }, [id, locale]);

  /**
   * Get Developmental Goal Options
   *
   * get a list of developmental goal options for treeSelect dropdown
   */
  const getDevelopmentalGoalOptions = useCallback(async () => {
    const [categoriesResult, devGoalsResults] = await Promise.all([
      axios.get(`api/option/categories?language=${locale}`),
      axios.get(`api/option/developmentalGoals?language=${locale}`),
    ]);

    // To handle the competencies category
    categoriesResult.data.push({
      id: undefined,
      name: intl.formatMessage({ id: "setup.competencies" }),
    });

    // Loop through all skill categories
    const dataTree = categoriesResult.data.map((category) => {
      const children = [];

      devGoalsResults.data.forEach((devGoal) => {
        if (devGoal.categoryId === category.id) {
          children.push({
            title: `${category.name}: ${devGoal.name}`,
            value: devGoal.id,
            key: devGoal.id,
          });
        }
      });

      return {
        title: category.name,
        value: category.id || category.name,
        children,
      };
    });

    setDevelopmentalGoalOptions(_.sortBy(dataTree, "title"));
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
    const result = await axios.get(`api/option/locations?language=${locale}`);

    setRelocationOptions(result.data);
  }, [locale]);

  /**
   * Get Saved Looking For New Job
   *
   * get Saved Looking For New Job from user profile
   */
  const getLookingForNewJobOptions = useCallback(async () => {
    const result = await axios.get(`api/option/lookingJobs?language=${locale}`);

    setLookingForNewJobOptions(result.data);
  }, [locale]);

  /**
   * Get Career Mobility Options
   *
   * get all dropdown options for Career Mobility
   */
  const getCareerMobilityOptions = useCallback(async () => {
    const result = await axios.get(
      `api/option/careerMobilities?language=${locale}`
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
      `api/option/talentMatrixResults?language=${locale}`
    );

    setTalentMatrixResultOptions(result.data);
  }, [locale]);

  /**
   * Get default form tab
   *
   * get the default selected form tab based on url query params
   */
  const getDefaultFormTab = () => {
    const searchParams = new URLSearchParams(location.search);
    setCurrentTab(searchParams.get("tab"));
  };

  // useEffect when url path is updated
  useEffect(() => {
    getDefaultFormTab();
  }, [location]);

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
      currentTab={currentTab}
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
