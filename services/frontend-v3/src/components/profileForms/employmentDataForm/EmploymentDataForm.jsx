import React, { useState, useEffect } from "react";
import axios from "axios";
import { injectIntl } from "react-intl";
import EmploymentDataFormView from "./EmploymentDataFormView";
import config from "../../../config";

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
  const locale = props.intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  // Get substantive level options
  const getSubstantiveOptions = async () => {
    try {
      const result = await axios.get(`${backendAddress}api/option/getTenure`);

      const options = [];
      // Generate the data for dropdown
      for (let i = 0; i < result.data.length; i++) {
        const option = {
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
      const url = `${backendAddress}api/option/getGroupLevel`;
      const result = await axios.get(url);
      const options = [];

      // Generate the data for dropdown
      for (let i = 0; i < result.data.length; i++) {
        const option = {
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
      const url = `${backendAddress}api/option/getSecurityClearance`;
      const result = await axios.get(url);
      const options = [];

      // Generate the data for dropdown
      for (let i = 0; i < result.data.length; i++) {
        const option = {
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
      const url = `${backendAddress}api/private/profile/${localStorage.getItem(
        "userId"
      )}`;
      const result = await axios.get(url);
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
