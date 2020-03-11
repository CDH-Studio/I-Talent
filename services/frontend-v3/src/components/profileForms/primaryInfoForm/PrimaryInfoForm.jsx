import React, { useState, useEffect } from "react";
import PrimaryInfoFormView from "./PrimaryInfoFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

function PrimaryInfoForm() {
  const [locationOptions, setLocationOptions] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  // get possible locations for form drop down
  const getLocations = async () => {
    try {
      let result = await axios.get(backendAddress + "api/option/getLocation");
      await setLocationOptions(result.data);
      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // get user profile for form drop down
  const getProfileInfo = async () => {
    try {
      let url =
        backendAddress + "api/profile/" + localStorage.getItem("userId");
      let result = await axios.get(url);
      return await setProfileInfo(result.data);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // get all required data component
  const getAllData = async () => {
    try {
      await getProfileInfo();
      await getLocations();
      setLoad(true);
      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // useEffect to run once component is mounted
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <PrimaryInfoFormView
      locationOptions={locationOptions}
      profileInfo={profileInfo}
      load={load}
    />
  );
}

export default PrimaryInfoForm;
