import React, { useState, useEffect } from "react";
import EmploymentDataFormView from "../../profileForms/employmentDataForm/EmploymentDataFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

/**
 *  EmploymentDataForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
function EmploymentDataForm() {
  const [substantiveOptions, setSubstantiveOptions] = useState(null);
  const [classificationOptions, setClassificationOptions] = useState(null);
  const [securityOptions, setSecurityOptions] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  /* get substantive level options */
  const getSubstantiveOptions = async () => {
    try {
      let result = await axios.get(backendAddress + "api/option/getTenure");
      await setSubstantiveOptions(result.data);
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
      return await setClassificationOptions(result.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  /* get security options */
  const getSecurityOptions = async () => {
    try {
      let url = backendAddress + "api/option/getSecurityClearance";
      let result = await axios.get(url);
      return await setSecurityOptions(result.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  /* get user profile for form drop down */
  const getProfileInfo = async () => {
    try {
      let url =
        backendAddress + "api/profile/" + localStorage.getItem("userId");
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

  /* useEffect to run once component is mounted */
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <EmploymentDataFormView
      substantiveOptions={substantiveOptions}
      classificationOptions={classificationOptions}
      securityOptions={securityOptions}
      profileInfo={profileInfo}
      load={load}
    />
  );
}

export default EmploymentDataForm;
