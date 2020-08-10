/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAxios from "../../../../utils/axios-instance";
import handleError from "../../../../functions/handleError";
import EducationFormView from "./EducationFormView";
import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
} from "../../../../utils/customPropTypes";

const EducationForm = ({
  form,
  field,
  remove,
  profileInfo,
  checkIfFormValuesChanged,
}) => {
  // Define States
  const [load, setLoad] = useState(false);
  const [diplomaOptions, setDiplomaOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);

  // get current language code
  const { locale } = useSelector((state) => state.settings);
  const axios = useAxios();

  /**
   * Get Diploma Options
   *
   * get a list of diploma options for dropdown
   */
  const getDiplomaOptions = useCallback(async () => {
    const result = await axios.get(`api/option/diplomas?language=${locale}`);

    setDiplomaOptions(result.data);
  }, [locale]);

  /**
   * Get School Options
   *
   * get a list of diploma options for dropdown
   */
  const getSchoolOptions = useCallback(async () => {
    const result = await axios.get(`api/option/schools?language=${locale}`);

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
  checkIfFormValuesChanged: PropTypes.func.isRequired,
};

export default EducationForm;
