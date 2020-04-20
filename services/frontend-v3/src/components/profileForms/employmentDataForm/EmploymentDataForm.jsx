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
function EmploymentDataForm(props) {
  const [substantiveOptions, setSubstantiveOptions] = useState(null);
  const [classificationOptions, setClassificationOptions] = useState(null);
  const [securityOptions, setSecurityOptions] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  // get current language code
  let locale = props.intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  /* useEffect to run once component is mounted */
  useEffect(() => {
    /* get substantive level options */
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
        await setSubstantiveOptions(options);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* get classification options */
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
        await setClassificationOptions(options);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* get security options */
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
        return await setSecurityOptions(options);
      } catch (error) {
        throw new Error(error);
      }
    };

    /* get user profile for form drop down */
    const getProfileInfo = async () => {
      try {
        let url =
          backendAddress +
          "api/private/profile/" +
          localStorage.getItem("userId");
        let result = await axios.get(url);
        await setProfileInfo(result.data);
        return 1;
      } catch (error) {
        throw new Error(error);
      }
    };

    /* get all required data component */
    const getAllData = async () => {
      try {
        await getClassificationOptions();
        await getSubstantiveOptions();
        await getSecurityOptions();
        await getProfileInfo();
        setLoad(true);
        return 1;
      } catch (error) {
        setLoad(false);
        console.log(error);
        return 0;
      }
    };

    getAllData();
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
}

export default injectIntl(EmploymentDataForm);
