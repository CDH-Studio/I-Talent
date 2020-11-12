import React, { useState, useEffect, useCallback } from "react";
import sortBy from "lodash/sortBy";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import useAxios from "../../../utils/useAxios";

import CareerManagementFormView from "./CareerManagementFormView";
import handleError from "../../../functions/handleError";

/**
 *  Career Management Form(props)
 *  Controller for the PersonalGrowthFormView.
 *  It gathers the required data for rendering the component
 */
const CareerManagementForm = ({ formType }) => {
  // Define States
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);
  const [developmentalGoalOptions, setDevelopmentalGoalOptions] = useState([]);
  const [savedDevelopmentalGoals, setSavedDevelopmentalGoals] = useState([]);
  const [savedAttachments, setSavedAttachments] = useState(null);
  const [interestedInRemoteOptions, setInterestedInRemoteOptions] = useState(
    []
  );
  const [relocationOptions, setRelocationOptions] = useState([]);
  const [attachmentOptions, setAttachmentOptions] = useState([]);
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
  const [classificationOptions, setClassificationOptions] = useState([]);
  const [savedQualifiedPools, setSavedQualifiedPools] = useState(undefined);
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
    if (profileInfo.developmentalGoals)
      setSavedDevelopmentalGoals(
        profileInfo.developmentalGoals.map((i) => i.id)
      );

    if (profileInfo.developmentalGoalsAttachments)
      setSavedAttachments(
        profileInfo.developmentalGoalsAttachments.map((link) => ({
          id: link.id,
          nameId: link.name.id,
          url: link.url,
        }))
      );
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
   * Get saved Qualified Pools
   *
   * get saved Qualified Pools from profile
   */
  const getSavedQualifiedPools = () => {
    const ll = {
      qualifiedPools: profileInfo.qualifiedPools.map((i) => ({
        id: i.id,
        classificationId: i.classification.id,
        jobTitle: i.jobTitle,
        selectionProcessNumber: i.selectionProcessNumber,
        jobPosterLink: i.jobPosterLink,
      })),
    };
    if (profileInfo.qualifiedPools) setSavedQualifiedPools(ll.qualifiedPools);
  };

  /**
   * Get User Profile
   */
  const getProfileInfo = useCallback(async () => {
    const result = await axios.get(
      `api/profile/private/${id}?language=${locale}`
    );

    setProfileInfo(result.data);
  }, [axios, id, locale]);

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

    setDevelopmentalGoalOptions(sortBy(dataTree, "title"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axios, locale]);

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
        value: true,
      },
      {
        key: "false",
        text: locale === "ENGLISH" ? "No" : "Non",
        value: false,
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
      `api/option/cityLocations?language=${locale}`
    );
    setRelocationOptions(result.data);
  }, [axios, locale]);

  /**
   * Get Attachment Options
   *
   * get a list of Attachment Options for dropdown treeSelect
   */
  const getAddAttachmentOptions = useCallback(async () => {
    const result = await axios.get(
      `api/option/attachmentNames?language=${locale}&type=Dev`
    );
    setAttachmentOptions(result.data);
  }, [axios, locale]);

  /**
   * Get Saved Looking For New Job
   *
   * get Saved Looking For New Job from user profile
   */
  const getLookingForNewJobOptions = useCallback(async () => {
    const result = await axios.get(`api/option/lookingJobs?language=${locale}`);
    setLookingForNewJobOptions(result.data);
  }, [axios, locale]);

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
  }, [axios, locale]);

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
  }, [axios, locale]);

  /**
   * Get Classification Options
   *
   * get all dropdown options for Classifications
   */
  const getClassificationOptions = useCallback(async () => {
    const result = await axios.get(
      `api/option/classifications?language=${locale}`
    );

    setClassificationOptions(result.data);
  }, [axios, locale]);

  /**
   * Get default form tab
   *
   * get the default selected form tab based on url query params
   */
  const getDefaultFormTab = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    setCurrentTab(searchParams.get("tab"));
  }, [location.search]);

  // useEffect when url path is updated
  useEffect(() => {
    getDefaultFormTab();
  }, [getDefaultFormTab, location]);

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
      getSavedQualifiedPools();
      setSavedLookingForNewJob(lookingJob ? lookingJob.id : undefined);
      setSavedTalentMatrixResult(
        talentMatrixResult ? talentMatrixResult.id : undefined
      );
      setSavedCareerMobility(careerMobility ? careerMobility.id : undefined);
      setSavedExFeederBool(exFeeder);
      // setSavedQualifiedPools(qualifiedPools);
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
      getAddAttachmentOptions(),
      getClassificationOptions(),
    ])
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        handleError(error, "redirect", history);
      });
  }, [
    getAddAttachmentOptions,
    getCareerMobilityOptions,
    getDevelopmentalGoalOptions,
    getInterestedInRemoteOptions,
    getLookingForNewJobOptions,
    getProfileInfo,
    getRelocationOptions,
    getTalentMatrixResultOptions,
    history,
    getClassificationOptions,
  ]);

  return (
    <CareerManagementFormView
      profileInfo={profileInfo}
      developmentalGoalOptions={developmentalGoalOptions}
      savedDevelopmentalGoals={savedDevelopmentalGoals}
      savedAttachments={savedAttachments}
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
      classificationOptions={classificationOptions}
      savedQualifiedPools={savedQualifiedPools}
      formType={formType}
      currentTab={currentTab}
      load={load}
      history={history}
      userId={id}
      attachmentOptions={attachmentOptions}
    />
  );
};

CareerManagementForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default CareerManagementForm;
