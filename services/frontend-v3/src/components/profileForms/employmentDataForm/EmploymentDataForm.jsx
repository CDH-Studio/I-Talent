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
  const [load, setLoad] = useState(false);
  const axios = useAxios();

  const [charsLeft, setCharsLeft] = useState(1000);

  const handleDescriptionChange = (e) => {
    setCharsLeft(1000 - e.currentTarget.value.length);
  };

  const history = useHistory();

  // Get current language code
  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);

  // Get substantive level options
  const getSubstantiveOptions = useCallback(async () => {
    const result = await axios.get(`api/option/tenures?language=${locale}`);

    setSubstantiveOptions(result.data);
  }, [axios, locale]);

  // Get classification options
  const getClassificationOptions = useCallback(async () => {
    const result = await axios.get(
      `api/option/classifications?language=${locale}`
    );

    setClassificationOptions(result.data);
  }, [axios, locale]);

  // Get security options
  const getSecurityOptions = useCallback(async () => {
    const result = await axios.get(
      `api/option/securityClearances?language=${locale}`
    );

    setSecurityOptions(result.data);
  }, [axios, locale]);

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    const result = await axios.get(
      `api/profile/private/${id}?language=${locale}`
    );

    setProfileInfo(result.data);

    if (result.data.description) {
      setCharsLeft(1000 - result.data.description.length);
    }
  }, [axios, id, locale]);

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
