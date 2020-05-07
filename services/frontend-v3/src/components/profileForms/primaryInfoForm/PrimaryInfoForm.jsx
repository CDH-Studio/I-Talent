import React, { useState, useEffect } from "react";
import PrimaryInfoFormView from "./PrimaryInfoFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

const PrimaryInfoForm = (props) => {
  const [locationOptions, setLocationOptions] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  // Get possible locations for form drop down
  const getLocations = async () => {
    try {
      let result = await axios.get(backendAddress + "api/option/getLocation");
      setLocationOptions(result.data);
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Get user profile for form drop down
  const getProfileInfo = async () => {
    try {
      let url =
        backendAddress +
        "api/private/profile/" +
        localStorage.getItem("userId");
      let result = await axios.get(url);
      setProfileInfo(result.data);
      return 1;
    } catch (error) {
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
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <PrimaryInfoFormView
      locationOptions={locationOptions}
      profileInfo={profileInfo}
      load={load}
      formType={props.formType}
    />
  );
};

export default PrimaryInfoForm;
