import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import handleError from "../../../functions/handleError";
import useAxios from "../../../utils/useAxios";
import QualificationsFormView from "./QualificationsFormView";

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
            attachmentNamesEdu: attachmentNamesEduQuery.data,
            attachmentNamesExp: attachmentNamesExpQuery.data,
            diplomas: diplomasQuery.data,
            schools: schoolsQuery.data,
          });
          if (profileQuery.data) {
            setInitialValues({
              educations: profileQuery.data.educations.map((i) => ({
                attachmentLinks: i.attachmentLinks
                  ? i.attachmentLinks.map((link) => ({
                      id: link.id,
                      nameId: link.name.id,
                      url: link.url,
                    }))
                  : undefined,
                description: i.description,
                diplomaId: i.diploma.id,
                endDate: i.endDate ? dayjs(i.endDate) : undefined,
                id: i.id,
                ongoingDate: i.ongoingDate,
                schoolId: i.school.id,
                startDate: i.startDate ? dayjs(i.startDate) : undefined,
              })),
              experiences: profileQuery.data.experiences.map((i) => ({
                attachmentLinks: i.attachmentLinks
                  ? i.attachmentLinks.map((link) => ({
                      id: link.id,
                      nameId: link.name.id,
                      url: link.url,
                    }))
                  : undefined,
                description: i.description,
                endDate: i.endDate ? dayjs(i.endDate) : undefined,
                id: i.id,
                jobTitle: i.jobTitle,
                ongoingDate: i.ongoingDate,
                organization: i.organization,
                projects: i.projects,
                startDate: i.startDate ? dayjs(i.startDate) : undefined,
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
      currentTab={currentTab}
      formType={formType}
      history={history}
      initialValues={initialValues}
      load={load}
      options={options}
      profileInfo={profileInfo}
      saveDataToDB={saveDataToDB}
      userId={id}
    />
  );
};

QualificationsForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default QualificationsForm;
