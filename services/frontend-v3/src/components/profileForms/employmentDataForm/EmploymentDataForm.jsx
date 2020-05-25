import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import handleError from "../../../functions/handleError";
import config from "../../../config";
import EmploymentDataFormView from "./EmploymentDataFormView";

const { backendAddress } = config;

/**
 *  EmploymentDataForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
const EmploymentDataForm = ({ formType, history }) => {
  const [substantiveOptions, setSubstantiveOptions] = useState([]);
  const [classificationOptions, setClassificationOptions] = useState([]);
  const [securityOptions, setSecurityOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  // Get current language code
  const { locale } = useSelector(state => state.settings);

  // Get substantive level options
  const getSubstantiveOptions = useCallback(async () => {
    try {
      const result = await axios.get(`${backendAddress}api/option/getTenure`);

      const options = [];
      // Generate the data for dropdown
      for (let i = 0; i < result.data.length; i += 1) {
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
  }, [locale]);

  // Get classification options
  const getClassificationOptions = async () => {
    try {
      const url = `${backendAddress}api/option/getGroupLevel`;
      const result = await axios.get(url);
      const options = [];

      // Generate the data for dropdown
      for (let i = 0; i < result.data.length; i += 1) {
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
  const getSecurityOptions = useCallback(async () => {
    try {
      const url = `${backendAddress}api/option/getSecurityClearance`;
      const result = await axios.get(url);
      const options = [];

      // Generate the data for dropdown
      for (let i = 0; i < result.data.length; i += 1) {
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
  }, [locale]);

  // Get user profile for form drop down
  const getProfileInfo = async () => {
    try {
      const url = `${backendAddress}api/profile/private/${localStorage.getItem(
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
      .catch(error => {
        setLoad(false);
        // eslint-disable-next-line no-console
        console.log(error);
        handleError(error, dispatch, history);
      });
  }, [getSecurityOptions, getSubstantiveOptions]);

  return (
    <EmploymentDataFormView
      substantiveOptions={substantiveOptions}
      classificationOptions={classificationOptions}
      securityOptions={securityOptions}
      profileInfo={profileInfo}
      formType={formType}
      locale={locale}
      load={load}
    />
  );
};

EmploymentDataForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default EmploymentDataForm;
