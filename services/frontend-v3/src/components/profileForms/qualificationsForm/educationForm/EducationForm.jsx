import React, { useState, useEffect } from "react";
import EducationFormView from "./EducationFormView";
import axios from "axios";
import { injectIntl } from "react-intl";
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
  let locale = props.intl.formatMessage({
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
      let url = backendAddress + "api/option/getDiploma";
      let result = await axios.get(url);
      let options = [];

      // Generate the data format required for treeSelect
      for (var i = 0; i < result.data.length; i++) {
        var option = {
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
      let url = backendAddress + "api/option/getSchool";
      let result = await axios.get(url);
      let dataTree = [];

      // Generate the data format required for treeSelect
      for (var i = 0; i < result.data.length; i++) {
        var goal = {
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
