import React, { useState, useEffect } from "react";
import EmploymentDataFormView from "../../profileForms/employmentDataForm/EmploymentDataFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

function EmploymentDataForm() {
  const [substantiveOptions, setSubstantiveOptions] = useState(null);
  const [classificationOptions, setClassificationOptions] = useState(null);
  const [securityOptions, setSecurityOptions] = useState(null);
  const [load, setLoad] = useState(false);

  // get substantive level options
  const getSubstantiveOptions = async () => {
    try {
      let result = await axios.get(backendAddress + "api/option/getTenure");
      await setSubstantiveOptions(result.data);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  // get classification options
  const getClassificationOptions = async () => {
    try {
      let url = backendAddress + "api/option/getGroupLevel";
      let result = await axios.get(url);
      return await setClassificationOptions(result.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  // get security options
  const getSecurityOptions = async () => {
    try {
      let url = backendAddress + "api/option/getSecurityClearance";
      let result = await axios.get(url);
      console.log(result);
      return await setSecurityOptions(result.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  // get all required data component
  const getAllData = async () => {
    try {
      await getClassificationOptions();
      await getSubstantiveOptions();
      await getSecurityOptions();
      setLoad(true);
      return 1;
    } catch (error) {
      setLoad(false);
      console.log(error);
      return 0;
    }
  };

  // useEffect to run once component is mounted
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <EmploymentDataFormView
      substantiveOptions={substantiveOptions}
      classificationOptions={classificationOptions}
      securityOptions={securityOptions}
      load={load}
    />
  );
}

export default EmploymentDataForm;
