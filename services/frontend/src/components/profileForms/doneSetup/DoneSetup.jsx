import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import DoneSetupView from "./DoneSetupView";
import useAxios from "../../../utils/useAxios";
import handleError from "../../../functions/handleError";

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetup = ({ formType }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);
  const axios = useAxios();
  const history = useHistory();

  const visibilityItems = [
    {
      label: "employment.equity.groups",
      url: "/profile/edit/primary-info",
      visibility: load ? profileInfo.visibleCards.employmentEquityGroup : null,
    },
    {
      label: "employment.status",
      url: "/profile/edit/employment",
      visibility: load ? profileInfo.visibleCards.info : null,
    },
    {
      label: "about.me",
      url: "/profile/edit/employment",
      visibility: load ? profileInfo.visibleCards.description : null,
    },
    {
      label: "official.languages",
      url: "/profile/edit/language-proficiency",
      visibility: load ? profileInfo.visibleCards.officialLanguage : null,
    },
    {
      label: "skills",
      url: "/profile/edit/talent?tab=skills",
      visibility: load ? profileInfo.visibleCards.skills : null,
    },
    {
      label: "mentorship.skills",
      url: "/profile/edit/talent?tab=mentorship",
      visibility: load ? profileInfo.visibleCards.mentorshipSkills : null,
    },
    {
      label: "competencies",
      url: "/profile/edit/talent?tab=competencies",
      visibility: load ? profileInfo.visibleCards.competencies : null,
    },
    {
      label: "education",
      url: "/profile/edit/qualifications?tab=education",
      visibility: load ? profileInfo.visibleCards.education : null,
    },
    {
      label: "experience",
      url: "/profile/edit/qualifications?tab=experience",
      visibility: load ? profileInfo.visibleCards.experience : null,
    },
    {
      label: "learning.development",
      url: "/profile/edit/career-management?tab=learning-development",
      visibility: load ? profileInfo.visibleCards.developmentalGoals : null,
    },
    {
      label: "qualified.pools",
      url: "/profile/edit/career-management?tab=qualified-pools",
      visibility: load ? profileInfo.visibleCards.qualifiedPools : null,
    },
    {
      label: "career.interests",
      url: "/profile/edit/career-management?tab=career-interests",
      visibility: load ? profileInfo.visibleCards.careerInterests : null,
    },
    {
      label: "talent.management",
      url: "/profile/edit/career-management?tab=talent-management",
      visibility: load ? profileInfo.visibleCards.talentManagement : null,
    },
    {
      label: "ex.feeder",
      url: "/profile/edit/career-management?tab=ex-feeder",
      visibility: load ? profileInfo.visibleCards.exFeeder : null,
    },
  ];

  /**
   * Get user profile
   */
  const getProfileInfo = useCallback(async () => {
    const result = await axios.get(
      `api/profile/private/${id}?language=${locale}`
    );
    setProfileInfo(result.data);
  }, [axios, id, locale]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // get all required data component
    Promise.all([getProfileInfo()])
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        handleError(error, "redirect", history);
      });
  }, [getProfileInfo, history]);

  return (
    <DoneSetupView
      userId={id}
      load={load}
      visibilityItems={visibilityItems}
      formType={formType}
    />
  );
};

DoneSetup.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default DoneSetup;
