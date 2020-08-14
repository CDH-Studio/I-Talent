import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import useAxios from "../../../utils/axios-instance";
import handleError from "../../../functions/handleError";
import QualificationsFormView from "./QualificationsFormView";

/**
 *  QualificationsForm
 *  Controller for the QualificationsFormView.
 *  It gathers the required data for rendering the component
 */
const QualificationsForm = ({ formType }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [diplomas, setDiplomas] = useState(null);
  const [schools, setSchools] = useState(null);
  const [attachmentNamesEdu, setAttachmentNamesEdu] = useState(null);
  const [attachmentNamesExp, setAttachmentNamesExp] = useState(null);
  const [load, setLoad] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);
  const [savedEducation, setSavedEducation] = useState();
  const [savedExperience, setSavedExperience] = useState();
  const [savedProjects, setSavedProjects] = useState();

  const { id } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);

  const axios = useAxios();
  const location = useLocation();
  const history = useHistory();

  const getBackendInfo = useCallback(async () => {
    try {
      return await Promise.all([
        axios.get(`api/profile/private/${id}?language=${locale}`),
        axios.get(`api/option/diplomas?language=${locale}`),
        axios.get(`api/option/schools?language=${locale}`),
        axios.get(`api/option/attachmentNames?language=${locale}&type=Edu`),
        axios.get(`api/option/attachmentNames?language=${locale}&type=Exp`),
      ]);
    } catch (error) {
      setLoad(false);
      throw error;
    }
  }, [axios, id, locale]);

  const saveDataToDB = async (unalteredValues) => {
    const values = { ...unalteredValues };
    await axios.put(`api/profile/${id}?language=${locale}`, values);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setCurrentTab(searchParams.get("tab"));
    getBackendInfo()
      .then(
        ([
          profileQuery,
          diplomasQuery,
          schoolsQuery,
          attachmentNamesEduQuery,
          attachmentNamesExpQuery,
        ]) => {
          setProfileInfo(profileQuery.data);
          setDiplomas(diplomasQuery.data);
          setSchools(schoolsQuery.data);
          setAttachmentNamesEdu(attachmentNamesEduQuery.data);
          setAttachmentNamesExp(attachmentNamesExpQuery.data);
          if (profileQuery.data) {
            setSavedEducation(
              profileQuery.data.educations.map((i) => ({
                schoolId: i.school.id,
                diplomaId: i.diploma.id,
                startDate: i.startDate ? moment(i.startDate) : undefined,
                endDate: i.endDate ? moment(i.endDate) : undefined,
                description: i.description,
                attachmentLinks: i.attachmentLinks.map((link) => ({
                  nameId: link.name.id,
                  url: link.url,
                })),
              }))
            );
            setSavedExperience(
              profileQuery.data.experiences.map((i) => ({
                jobTitle: i.jobTitle,
                organization: i.organization,
                description: i.description,
                startDate: i.startDate ? moment(i.startDate) : undefined,
                endDate: i.endDate ? moment(i.endDate) : undefined,
              }))
            );
            setSavedProjects(profileQuery.data.projects);
          }
          setLoad(true);
        }
      )
      .catch((error) => handleError(error, "redirect"));
  }, [getBackendInfo, location.search]);

  return (
    <QualificationsFormView
      profileInfo={profileInfo}
      savedEducation={savedEducation}
      savedExperience={savedExperience}
      savedProjects={savedProjects}
      formType={formType}
      currentTab={currentTab}
      load={load}
      history={history}
      userId={id}
      attachmentNamesTypeEduOptions={attachmentNamesEdu}
      attachmentNamesTypeExpOptions={attachmentNamesExp}
      diplomaOptions={diplomas}
      schoolOptions={schools}
      saveDataToDB={saveDataToDB}
    />
  );
};

QualificationsForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default QualificationsForm;
