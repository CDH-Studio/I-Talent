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

  const editUrls = {
    employmentEquityGroup: "/profile/edit/primary-info",
    info: "/profile/edit/employment",
    description: "/profile/edit/employment",
    officialLanguage: "/profile/edit/language-proficiency",
    skills: "/profile/edit/talent?tab=skills",
    mentorshipSkills: "/profile/edit/talent?tab=mentorship",
    competencies: "/profile/edit/talent?tab=competencies",
    education: "/profile/edit/qualifications?tab=education",
    experience: "/profile/edit/qualifications?tab=experience",
    developmentalGoals:
      "/profile/edit/career-management?tab=learning-development",
    qualifiedPools: "/profile/edit/career-management?tab=qualified-pools",
    careerInterests: "/profile/edit/career-management?tab=career-interests",
    talentManagement: "/profile/edit/career-management?tab=talent-management",
    exFeeder: "/profile/edit/career-management?tab=ex-feeder",
  };

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
      visibleCards={load ? profileInfo.visibleCards : null}
      editUrls={editUrls}
      formType={formType}
    />
  );
};

DoneSetup.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default DoneSetup;
