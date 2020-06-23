import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import handleError from "../../../functions/handleError";
import config from "../../../config";
import EmploymentDataFormView from "./EmploymentDataFormView";

const { backendAddress } = config;

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
  const [load, setLoad] = useState(false);

  const history = useHistory();

  // Get current language code
  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);

  // Get substantive level options
  const getSubstantiveOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/tenures?language=${locale}`
    );

    setSubstantiveOptions(result.data);
  }, [locale]);

  // Get classification options
  const getClassificationOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/classifications?language=${locale}`
    );

    setClassificationOptions(result.data);
  }, [locale]);

  // Get security options
  const getSecurityOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/securityClearances?language=${locale}`
    );

    setSecurityOptions(result.data);
  }, [locale]);

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/profile/private/${id}?language=${locale}`
    );

    setProfileInfo(result.data);
  }, [id, locale]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // Get all required data component
    Promise.all([
      getClassificationOptions(),
      getSubstantiveOptions(),
      getSecurityOptions(),
      getProfileInfo(),
    ])
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        handleError(error, "redirect");
      });
  }, [
    getClassificationOptions,
    getProfileInfo,
    getSecurityOptions,
    getSubstantiveOptions,
  ]);

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
      userId={id}
    />
  );
};

EmploymentDataForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default EmploymentDataForm;
