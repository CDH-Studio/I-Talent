import React, { useState, useEffect } from "react";
import EmploymentDataFormView from "../../profileForms/employmentDataForm/EmploymentDataFormView";
import axios from "axios";
import config from "../../../config";
import { injectIntl } from "react-intl";
const { backendAddress } = config;

/**
 *  EmploymentDataForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
const EmploymentDataForm = (props) => {
  const [substantiveOptions, setSubstantiveOptions] = useState(null);
  const [classificationOptions, setClassificationOptions] = useState(null);
  const [securityOptions, setSecurityOptions] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  // Get current language code
  let locale = props.intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  // Get substantive level options
  const getSubstantiveOptions = async () => {
    try {
      let result = await axios.get(backendAddress + "api/option/getTenure");

      let options = [];
      // Generate the data for dropdown
      for (var i = 0; i < result.data.length; i++) {
        var option = {
          title: result.data[i].description[locale],
          key: result.data[i].id,
        };
        options.push(option);
      }
      setSubstantiveOptions(options);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Get classification options
  const getClassificationOptions = async () => {
    try {
      let url = backendAddress + "api/option/getGroupLevel";
      let result = await axios.get(url);
      let options = [];

      // Generate the data for dropdown
      for (var i = 0; i < result.data.length; i++) {
        var option = {
          title: result.data[i].description,
          key: result.data[i].id,
        };
        options.push(option);
      }
      setClassificationOptions(options);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Get security options
  const getSecurityOptions = async () => {
    try {
      let url = backendAddress + "api/option/getSecurityClearance";
      let result = await axios.get(url);
      let options = [];

      // Generate the data for dropdown
      for (var i = 0; i < result.data.length; i++) {
        var option = {
          title: result.data[i].description[locale],
          key: result.data[i].id,
        };
        options.push(option);
      }
      setSecurityOptions(options);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Get user profile for form drop down
  const getProfileInfo = async () => {
    try {
      let url =
        backendAddress +
        "api/private/profile/" +
        localStorage.getItem("userId");
      let result = await axios.get(url);
      setProfileInfo(result.data);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

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
        console.log(error);
      });
  }, [locale]);

  return (
    <EmploymentDataFormView
      substantiveOptions={substantiveOptions}
      classificationOptions={classificationOptions}
      securityOptions={securityOptions}
      profileInfo={profileInfo}
      formType={props.formType}
      locale={locale}
      load={load}
    />
  );
};

export default injectIntl(EmploymentDataForm);
