import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PrimaryInfoFormView from "./PrimaryInfoFormView";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;

const PrimaryInfoForm = ({ formType }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  // Get possible locations for form drop down
  const getLocations = async () => {
    const result = await axios.get(`${backendAddress}api/option/getLocation`);
    setLocationOptions(result.data ? result.data : []);
    return 1;
  };

  // Get user profile for form drop down
  const getProfileInfo = async () => {
    const url = `${backendAddress}api/profile/private/${localStorage.getItem(
      "userId"
    )}`;
    const result = await axios.get(url);
    setProfileInfo(result.data);
    return 1;
  };

  // useEffect to run once component is mounted
  useEffect(() => {
    // Get all required data component
    Promise.all([getProfileInfo(), getLocations()])
      .then(() => {
        setLoad(true);
      })
      .catch(error => {
        handleError(error, "redirect");
      });
  }, []);

  return (
    <PrimaryInfoFormView
      locationOptions={locationOptions}
      profileInfo={profileInfo}
      load={load}
      formType={formType}
    />
  );
};

PrimaryInfoForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default PrimaryInfoForm;
