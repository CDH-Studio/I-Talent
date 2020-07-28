import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../../../utils/axios-instance";
import PrimaryInfoFormView from "./PrimaryInfoFormView";
import handleError from "../../../functions/handleError";

const PrimaryInfoForm = ({ formType }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  const { id, email } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);
  const axios = useAxios();

  const history = useHistory();

  // Get possible locations for form drop down
  const getLocations = useCallback(async () => {
    const result = await axios.get(`api/option/locations?language=${locale}`);
    setLocationOptions(result.data ? result.data : []);
  }, [locale]);

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    if (id) {
      const result = await axios.get(
        `api/profile/private/${id}?language=${locale}`
      );
      setProfileInfo(result.data);
    }
  }, [id, locale]);

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
  }, [getLocations, getProfileInfo]);

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
