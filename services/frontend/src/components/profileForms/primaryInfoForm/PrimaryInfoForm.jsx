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
  const [load, setLoad] = useState(false);
  const [employmentEquityOptions, setEmploymentEquityOptions] = useState([]);

  const { id, email } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);
  const axios = useAxios();

  const history = useHistory();
  const intl = useIntl();

  // Get possible locations for form drop down
  const getLocations = useCallback(async () => {
    const result = await axios.get(`api/option/locations?language=${locale}`);
    console.log("result.data", result.data);
    setLocationOptions(result.data ? result.data : []);
  }, [axios, locale]);

  // Get user profile for form drop down
  const getProfileInfo = useCallback(async () => {
    if (id) {
      const result = await axios.get(
        `api/profile/private/${id}?language=${locale}`
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

  console.log("locationOptions", locationOptions);

  return (
    <PrimaryInfoFormView
      email={email}
      employmentEquityOptions={employmentEquityOptions}
      formType={formType}
      history={history}
      load={load}
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
