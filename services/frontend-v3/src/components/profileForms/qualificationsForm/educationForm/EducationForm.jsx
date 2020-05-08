import React, { useState, useEffect } from "react";
import axios from "axios";
import { injectIntl } from "react-intl";
import EducationFormView from "./EducationFormView";
import config from "../../../../config";

const { backendAddress } = config;

/**
 *  EducationForm
 *  Controller for the EducationFormView.
 *  This component is strongly linked ot Qualifications Form.
 *  It generated the form fields for each education item the user creates in the qualifications form.
 */
const EducationForm = (props) => {
  // Define States
  const [load, setLoad] = useState(false);
  const [diplomaOptions, setDiplomaOptions] = useState();
  const [schoolOptions, setSchoolOptions] = useState();

  // get current language code
  const locale = props.intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  /**
   * Get Diploma Options
   *
   * get a list of diploma options for dropdown
   */
  const getDiplomaOptions = async () => {
    try {
      const url = `${backendAddress}api/option/getDiploma`;
      const result = await axios.get(url);
      const options = [];

      // Generate the data format required for treeSelect
      for (let i = 0; i < result.data.length; i++) {
        const option = {
          title: result.data[i].description[locale],
          key: result.data[i].id,
        };
        options.push(option);
      }
      setDiplomaOptions(options);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * Get School Options
   *
   * get a list of diploma options for dropdown
   */
  const getSchoolOptions = async () => {
    try {
      const url = `${backendAddress}api/option/getSchool`;
      const result = await axios.get(url);
      const dataTree = [];

      // Generate the data format required for treeSelect
      for (let i = 0; i < result.data.length; i++) {
        const goal = {
          title: result.data[i].description,
          key: result.data[i].id,
        };
        dataTree.push(goal);
      }
      setSchoolOptions(dataTree);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  // useEffect to run once component is mounted
  useEffect(() => {
    // Get all required data component
    Promise.all([getDiplomaOptions(), getSchoolOptions()])
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        console.log(error);
      });
  }, [locale]);

  return (
    <EducationFormView
      form={props.form}
      field={props.field}
      remove={props.remove}
      diplomaOptions={diplomaOptions}
      schoolOptions={schoolOptions}
      profileInfo={props.profileInfo}
      style={props.style}
      load={load}
    />
  );
};

export default injectIntl(EducationForm);
