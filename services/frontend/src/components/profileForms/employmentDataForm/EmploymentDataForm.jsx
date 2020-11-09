import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useAxios from "../../../utils/useAxios";
import handleError from "../../../functions/handleError";
import EmploymentDataFormView from "./EmploymentDataFormView";

/**
 *  EmploymentDataForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
const EmploymentDataForm = ({ formType }) => {
  const [substantiveOptions, setSubstantiveOptions] = useState([]);
  const [classificationOptions, setClassificationOptions] = useState([]);
  const [securityOptions, setSecurityOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(true);
  const axios = useAxios();
  const history = useHistory();

  const [charsLeft, setCharsLeft] = useState(1000);

  const handleDescriptionChange = (e) => {
    setCharsLeft(1000 - e.currentTarget.value.length);
  };

  // Get current language code
  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);

  const getBackendInfo = useCallback(async () => {
    try {
      return await Promise.all([
        axios.get(`api/option/tenures?language=${locale}`),
        axios.get(`api/option/classifications?language=${locale}`),
        axios.get(`api/option/securityClearances?language=${locale}`),
        axios.get(`api/profile/private/${id}?language=${locale}`),
      ]);
    } catch (error) {
      handleError(error, "redirect", history);
      throw error;
    }
  }, [axios, history, id, locale]);

  useEffect(() => {
    getBackendInfo().then(
      ([substantive, classification, security, profile]) => {
        setSubstantiveOptions(substantive.data);
        setClassificationOptions(classification.data);
        setSecurityOptions(security.data);
        setProfileInfo(profile.data);
        if (profile.data.description)
          setCharsLeft(1000 - profile.data.description.length);
        setLoad(false);
      }
    );
  }, [getBackendInfo]);

  return (
    <EmploymentDataFormView
      substantiveOptions={substantiveOptions}
      classificationOptions={classificationOptions}
      securityOptions={securityOptions}
      profileInfo={profileInfo}
      formType={formType}
      locale={locale}
      load={load}
      history={history}
      handleDescriptionChange={handleDescriptionChange}
      charsLeft={charsLeft}
      userId={id}
    />
  );
};

EmploymentDataForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default EmploymentDataForm;
