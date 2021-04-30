import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import useAxios from "../../../utils/useAxios";
import PrimaryInfoFormView from "./PrimaryInfoFormView";
import handleError from "../../../functions/handleError";

const PrimaryInfoForm = ({ formType }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [employmentEquityOptions, setEmploymentEquityOptions] = useState([]);

  const { id, email } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);
  const axios = useAxios();

  const history = useHistory();
  const intl = useIntl();

  // Get possible locations for form drop down
  const getLocations = useCallback(async () => {
    const result = await axios.get(`option/locations?language=${locale}`);
    setLocationOptions(result.data ? result.data : []);
  }, [axios, locale]);

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    if (id) {
      const result = await axios.get(
        `profile/private/${id}?language=${locale}`
      );
      setProfileInfo(result.data);
    }
  }, [axios, id, locale]);

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
          handleError(error, "redirect", history);
        }
      })
      .then(getLocations)
      .catch((error) => {
        handleError(error, "redirect", history);
      })
      .then(() => setLoad(true));
  }, [getLocations, getProfileInfo, history]);

  useEffect(() => {
    setEmploymentEquityOptions([
      {
        key: "WOMEN",
        value: "WOMEN",
        text: intl.formatMessage({ id: "employment.equity.group.woman" }),
      },
      {
        key: "INDIGENOUS",
        value: "INDIGENOUS",
        text: intl.formatMessage({ id: "employment.equity.group.indigenous" }),
      },
      {
        key: "DISABILITY",
        value: "DISABILITY",
        text: intl.formatMessage({ id: "employment.equity.group.disability" }),
      },
      {
        key: "MINORITY",
        value: "MINORITY",
        text: intl.formatMessage({ id: "employment.equity.group.minority" }),
      },
    ]);
  }, [intl]);

  return (
    <PrimaryInfoFormView
      locationOptions={locationOptions}
      profileInfo={profileInfo}
      load={load}
      formType={formType}
      history={history}
      userId={id}
      email={email}
      employmentEquityOptions={employmentEquityOptions}
    />
  );
};

PrimaryInfoForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default PrimaryInfoForm;
