import React, { useState, useEffect } from "react";
import EmploymentDataFormView from "../../profileForms/employmentDataForm/EmploymentDataFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

function EmploymentDataForm() {
  const [substantiveOptions, setSubstantiveOptions] = useState(null);
  const [classificationOptions, setClassificationOptions] = useState(null);
  const [load, setLoad] = useState(false);

  // get possible locations for form drop down
  const getSubstantiveOptions = async () => {
    try {
      let result = await axios.get(backendAddress + "api/option/getTenure");
      await setSubstantiveOptions(result.data);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  // get user profile for form drop down
  const getClassification = async () => {
    try {
      let url = backendAddress + "api/option/getGroupLevel";
      let result = await axios.get(url);
      return await setClassificationOptions(result.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  // get all required data component
  const getAllData = async () => {
    try {
      await getClassification();
      await getSubstantiveOptions();
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
      load={load}
    />
  );
}

export default EmploymentDataForm;
