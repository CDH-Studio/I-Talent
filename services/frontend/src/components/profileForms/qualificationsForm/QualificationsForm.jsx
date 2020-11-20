import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import QualificationsFormView from "./QualificationsFormView";
import useAxios from "../../../utils/useAxios";
import handleError from "../../../functions/handleError";

/**
 *  QualificationsForm
 *  Controller for the QualificationsFormView.
 *  It gathers the required data for rendering the component
 */
const QualificationsForm = ({ formType }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const [options, setOptions] = useState(null);

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
          setOptions({
            diplomas: diplomasQuery.data,
            schools: schoolsQuery.data,
            attachmentNamesEdu: attachmentNamesEduQuery.data,
            attachmentNamesExp: attachmentNamesExpQuery.data,
          });
          if (profileQuery.data) {
            setInitialValues({
              educations: profileQuery.data.educations.map((i) => ({
                id: i.id,
                schoolId: i.school.id,
                diplomaId: i.diploma.id,
                startDate: i.startDate ? dayjs(i.startDate) : undefined,
                endDate: i.endDate ? dayjs(i.endDate) : undefined,
                ongoingDate: i.ongoingDate,
                description: i.description,
                attachmentLinks: i.attachmentLinks
                  ? i.attachmentLinks.map((link) => ({
                      id: link.id,
                      nameId: link.name.id,
                      url: link.url,
                    }))
                  : undefined,
              })),
              experiences: profileQuery.data.experiences.map((i) => ({
                id: i.id,
                jobTitle: i.jobTitle,
                organization: i.organization,
                description: i.description,
                startDate: i.startDate ? dayjs(i.startDate) : undefined,
                endDate: i.endDate ? dayjs(i.endDate) : undefined,
                ongoingDate: i.ongoingDate,
                attachmentLinks: i.attachmentLinks
                  ? i.attachmentLinks.map((link) => ({
                      id: link.id,
                      nameId: link.name.id,
                      url: link.url,
                    }))
                  : undefined,
                projects: i.projects,
              })),
            });
          }
          setLoad(true);
        }
      )
      .catch((error) => handleError(error, "redirect", history));
  }, [getBackendInfo, location.search, history]);

  return (
    <QualificationsFormView
      profileInfo={profileInfo}
      initialValues={initialValues}
      formType={formType}
      currentTab={currentTab}
      load={load}
      history={history}
      userId={id}
      options={options}
      saveDataToDB={saveDataToDB}
    />
  );
};

QualificationsForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default QualificationsForm;
