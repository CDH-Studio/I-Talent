import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// import { sortBy } from "lodash";
import PropTypes from "prop-types";

import handleError from "../../../functions/handleError";
import useAxios from "../../../utils/useAxios";
import CareerManagementFormView from "./CareerManagementFormView";

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
  const [savedTalentMatrixResult, setSavedTalentMatrixResult] =
    useState(undefined);
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
    const qualifiedPools =
      profileInfo.qualifiedPools &&
      profileInfo.qualifiedPools.map((i) => ({
        classificationId: i.classification.id,
        id: i.id,
        jobPosterLink: i.jobPosterLink,
        jobTitle: i.jobTitle,
        selectionProcessNumber: i.selectionProcessNumber,
      }));

    setSavedQualifiedPools(qualifiedPools);
  };

  /**
   * Get Interested In Remote Options
   *
   * get Interested In Remote Options
   * TODO: Generate this list from API call to back end
   */
  const getInterestedInRemoteOptions = useCallback(() => {
    const options = [
      {
        label: locale === "ENGLISH" ? "Yes" : "Oui",
        value: true,
      },
      {
        label: locale === "ENGLISH" ? "No" : "Non",
        value: false,
      },
    ];
    setInterestedInRemoteOptions(options);
  }, [locale]);

  const getBackendInfo = useCallback(async () => {
    try {
      const [
        profileResponse,
        categoriesResultResponse,
        devGoalsResultsResponse,
        relocationResponse,
        attachmentOptionsResponse,
        getNewJobOptionsResponse,
        mobilityOptionsResponse,
        matrixResultOptionsResponse,
        classificationOptionsResponse,
      ] = await Promise.all([
        axios.get(`api/profile/private/${id}?language=${locale}`),
        axios.get(`api/option/categories?language=${locale}`),
        axios.get(`api/option/developmentalGoals?language=${locale}`),
        axios.get(`api/option/cityLocations?language=${locale}`),
        axios.get(`api/option/attachmentNames?language=${locale}&type=Dev`),
        axios.get(`api/option/lookingJobs?language=${locale}`),
        axios.get(`api/option/careerMobilities?language=${locale}`),
        axios.get(`api/option/talentMatrixResults?language=${locale}`),
        axios.get(`api/option/classifications?language=${locale}`),
      ]);

      setProfileInfo(profileResponse.data);
      setRelocationOptions(relocationResponse.data);
      setAttachmentOptions(attachmentOptionsResponse.data);
      setLookingForNewJobOptions(getNewJobOptionsResponse.data);
      setCareerMobilityOptions(mobilityOptionsResponse.data);
      setTalentMatrixResultOptions(matrixResultOptionsResponse.data);
      setClassificationOptions(classificationOptionsResponse.data);

      // To handle the competencies category
      categoriesResultResponse.data.push({
        id: undefined,
        label: intl.formatMessage({ id: "competencies" }),
      });

      // Loop through all skill categories
      const dataTree = categoriesResultResponse.data.map((category) => {
        const options = [];

        devGoalsResultsResponse.data.forEach((devGoal) => {
          if (devGoal.categoryId === category.value) {
            options.push({
              label: `${category.label}: ${devGoal.label}`,
              value: devGoal.value,
            });
          }
        });

        return {
          label: category.label,
          options,
          value: category.value || category.label,
        };
      });

      setDevelopmentalGoalOptions(dataTree);

      setLoad(true);
    } catch (error) {
      setLoad(false);
      handleError(error, "redirect", history);
    }
  }, [axios, history, id, intl, locale]);

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
      const { lookingJob, talentMatrixResult, careerMobility, exFeeder } =
        profileInfo;
      getSavedDevelopmentalGoals();
      getSavedRelocationLocations();
      getSavedQualifiedPools();
      setSavedLookingForNewJob(lookingJob ? lookingJob.id : undefined);
      setSavedTalentMatrixResult(
        talentMatrixResult ? talentMatrixResult.id : undefined
      );
      setSavedCareerMobility(careerMobility ? careerMobility.id : undefined);
      setSavedExFeederBool(exFeeder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

  useEffect(() => {
    getInterestedInRemoteOptions();
    getBackendInfo();
  }, [getBackendInfo, getInterestedInRemoteOptions]);

  return (
    <CareerManagementFormView
      attachmentOptions={attachmentOptions}
      careerMobilityOptions={careerMobilityOptions}
      classificationOptions={classificationOptions}
      currentTab={currentTab}
      developmentalGoalOptions={developmentalGoalOptions}
      formType={formType}
      history={history}
      interestedInRemoteOptions={interestedInRemoteOptions}
      load={load}
      lookingForNewJobOptions={lookingForNewJobOptions}
      profileInfo={profileInfo}
      relocationOptions={relocationOptions}
      savedAttachments={savedAttachments}
      savedCareerMobility={savedCareerMobility}
      savedDevelopmentalGoals={savedDevelopmentalGoals}
      savedExFeederBool={savedExFeederBool}
      savedLookingForNewJob={savedLookingForNewJob}
      savedQualifiedPools={savedQualifiedPools}
      savedRelocationLocations={savedRelocationLocations}
      savedTalentMatrixResult={savedTalentMatrixResult}
      talentMatrixResultOptions={talentMatrixResultOptions}
      userId={id}
    />
  );
};

CareerManagementForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default CareerManagementForm;
