import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import handleError from "../../../../functions/handleError";
import EducationFormView from "./EducationFormView";
import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
  StylesPropType,
} from "../../../../customPropTypes";
import config from "../../../../config";

const { backendAddress } = config;

/**
 *  EducationForm
 *  Controller for the EducationFormView.
 *  This component is strongly linked ot Qualifications Form.
 *  It generated the form fields for each education item the user creates in the qualifications form.
 */
const EducationForm = ({
  form,
  field,
  remove,
  profileInfo,
  style,
  checkIfFormValuesChanged,
}) => {
  // Define States
  const [load, setLoad] = useState(false);
  const [diplomaOptions, setDiplomaOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);

  // get current language code
  const { locale } = useSelector((state) => state.settings);

  /**
   * Get Diploma Options
   *
   * get a list of diploma options for dropdown
   */
  const getDiplomaOptions = async () => {
    const url = `${backendAddress}api/option/getDiploma`;
    const result = await axios.get(url);
    const options = [];

    // Generate the data format required for treeSelect
    for (let i = 0; i < result.data.length; i += 1) {
      const option = {
        title: result.data[i].description[locale],
        key: result.data[i].id,
      };
      options.push(option);
    }
    setDiplomaOptions(options);
    return 1;
  };

  /**
   * Get School Options
   *
   * get a list of diploma options for dropdown
   */
  const getSchoolOptions = async () => {
    const url = `${backendAddress}api/option/getSchool`;
    const result = await axios.get(url);
    const dataTree = [];

    // Generate the data format required for treeSelect
    for (let i = 0; i < result.data.length; i += 1) {
      const goal = {
        title: result.data[i].description,
        key: result.data[i].id,
      };
      dataTree.push(goal);
    }
    setSchoolOptions(dataTree);
    return 1;
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
        handleError(error, "redirect");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <EducationFormView
      form={form}
      field={field}
      remove={remove}
      diplomaOptions={diplomaOptions}
      schoolOptions={schoolOptions}
      profileInfo={profileInfo}
      style={style}
      load={load}
      checkIfFormValuesChanged={checkIfFormValuesChanged}
    />
  );
};

EducationForm.propTypes = {
  form: FormInstancePropType.isRequired,
  field: FieldPropType.isRequired,
  remove: PropTypes.func.isRequired,
  profileInfo: ProfileInfoPropType.isRequired,
  style: StylesPropType.isRequired,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
};

export default EducationForm;
