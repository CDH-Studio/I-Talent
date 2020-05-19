import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PrimaryInfoFormView from "./PrimaryInfoFormView";
import config from "../../../config";

const { backendAddress } = config;

const PrimaryInfoForm = ({ formType }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [networkErrors, setNetworkErrors] = useState([]);

  // Get possible locations for form drop down
  const getLocations = async () => {
    try {
      const result = await axios.get(`${backendAddress}api/option/getLocation`);
      setLocationOptions(result.data ? result.data : []);
      return 1;
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      throw new Error(error);
    }
  };

  // Get user profile for form drop down
  const getProfileInfo = async () => {
    try {
      const url = `${backendAddress}api/private/profile/${localStorage.getItem(
        "userId"
      )}`;
      const result = await axios.get(url);
      setProfileInfo(result.data);
      return 1;
    } catch (error) {
      //setNetworkErrors(oldArray => oldArray.concat(error));
      return 0;
    }
  };

  // useEffect to run once component is mounted
  useEffect(() => {
    // Get all required data component
    Promise.all([getProfileInfo(), getLocations()])
      .then(() => {
        setLoad(true);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  return (
    <PrimaryInfoFormView
      locationOptions={locationOptions}
      profileInfo={profileInfo}
      load={load}
      networkErrors={networkErrors}
      formType={formType}
    />
  );
};

PrimaryInfoForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default PrimaryInfoForm;
