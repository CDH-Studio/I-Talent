import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";
import { IntlPropType } from "../customPropTypes";
import config from "../config";

const { backendAddress } = config;

const ProfileCreate = ({ intl, match }) => {
  const [highestStep, setHighestStep] = useState(1);

  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    if (match.params.step > highestStep) {
      setHighestStep(match.params.step);

      axios.put(
        `${backendAddress}api/profile/${id}?language=${
          locale === "en" ? "ENGLISH" : "FRENCH"
        }`,
        {
          signupStep: parseInt(match.params.step, 10),
        }
      );
    }
  }, [highestStep, id, match, locale]);

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: "create.profile",
    })} | I-Talent`;
  }, [intl]);

  return (
    <CreateProfileLayout step={match.params.step} highestStep={highestStep} />
  );
};

ProfileCreate.propTypes = {
  intl: IntlPropType,
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.any,
    }),
  }),
};

ProfileCreate.defaultProps = {
  intl: undefined,
  match: {
    params: undefined,
  },
};

export default injectIntl(ProfileCreate);
