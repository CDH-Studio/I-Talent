import React, { useState, useEffect, useCallback } from "react";
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
  const getDiplomaOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/diplomas?language=${locale}`
    );

    setDiplomaOptions(result.data);
  }, [locale]);

  /**
   * Get School Options
   *
   * get a list of diploma options for dropdown
   */
  const getSchoolOptions = useCallback(async () => {
    const result = await axios.get(
      `${backendAddress}api/option/schools?language=${locale}`
    );

    setSchoolOptions(result.data);
  }, [locale]);

  // useEffect to run once component is mounted
  // Get all required data component
  useEffect(() => {
    Promise.all([getDiplomaOptions(), getSchoolOptions()])
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        handleError(error, "redirect");
      });
  }, [getDiplomaOptions, getSchoolOptions, locale]);

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
