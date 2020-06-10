import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import PrimaryInfoFormView from "./PrimaryInfoFormView";
import config from "../../../config";

const { backendAddress } = config;

const PrimaryInfoForm = ({ formType }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const { id, email } = useSelector((state) => state.user);

  // Get possible locations for form drop down
  const getLocations = async () => {
    try {
      const result = await axios.get(`${backendAddress}api/option/getLocation`);
      setLocationOptions(result.data ? result.data : []);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    try {
      const url = `${backendAddress}api/profile/private/${id}`;
      const result = await axios.get(url);
      setProfileInfo(result.data);
      return 1;
    } catch (error) {
      return 0;
    }
  }, [id]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // Get all required data component
    Promise.all([getProfileInfo(), getLocations()])
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [getProfileInfo]);

  return (
    <PrimaryInfoFormView
      locationOptions={locationOptions}
      profileInfo={profileInfo}
      load={load}
      formType={formType}
      userId={id}
      email={email}
    />
  );
};

PrimaryInfoForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default PrimaryInfoForm;
