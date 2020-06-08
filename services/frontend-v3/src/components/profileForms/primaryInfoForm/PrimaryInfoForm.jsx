import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// eslint-disable-next-line import/no-named-as-default
import PrimaryInfoFormView from "./PrimaryInfoFormView";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;

const PrimaryInfoForm = ({ formType }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const { id, email } = useSelector((state) => state.user);

  const history = useHistory();

  // Get possible locations for form drop down
  const getLocations = async () => {
    const result = await axios.get(`${backendAddress}api/option/getLocation`);
    setLocationOptions(result.data ? result.data : []);
    return 1;
  };

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    const url = `${backendAddress}api/profile/private/${id}`;
    const result = await axios.get(url);
    setProfileInfo(result.data);
    return 1;
  }, [id]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // Get all required data component
    getProfileInfo()
      .catch((error) => {
        if (
          !error.isAxiosError ||
          !error.response ||
          error.response.status !== 404
        ) {
          handleError(error, "redirect");
        }
      })
      .then(getLocations)
      .catch((error) => {
        handleError(error, "redirect");
      })
      .then(() => setLoad(true));
  }, [getProfileInfo]);

  return (
    <PrimaryInfoFormView
      locationOptions={locationOptions}
      profileInfo={profileInfo}
      load={load}
      formType={formType}
      history={history}
      userId={id}
      email={email}
    />
  );
};

PrimaryInfoForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default PrimaryInfoForm;
