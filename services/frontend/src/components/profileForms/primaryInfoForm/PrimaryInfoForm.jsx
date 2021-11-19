import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import handleError from "../../../functions/handleError";
import useAxios from "../../../utils/useAxios";
import PrimaryInfoFormView from "./PrimaryInfoFormView";

const PrimaryInfoForm = ({ formType }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
      .then(() => setIsLoading(false));
  }, [getLocations, getProfileInfo, history]);

  useEffect(() => {
    setEmploymentEquityOptions([
      {
        label: intl.formatMessage({ id: "employment.equity.group.woman" }),
        value: "WOMEN",
      },
      {
        label: intl.formatMessage({ id: "employment.equity.group.indigenous" }),
        value: "INDIGENOUS",
      },
      {
        label: intl.formatMessage({ id: "employment.equity.group.disability" }),
        value: "DISABILITY",
      },
      {
        label: intl.formatMessage({ id: "employment.equity.group.minority" }),
        value: "MINORITY",
      },
    ]);
  }, [intl]);

  return (
    <PrimaryInfoFormView
      email={email}
      employmentEquityOptions={employmentEquityOptions}
      formType={formType}
      history={history}
      isLoading={isLoading}
      locationOptions={locationOptions}
      profileInfo={profileInfo}
      userId={id}
    />
  );
};

PrimaryInfoForm.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default PrimaryInfoForm;
