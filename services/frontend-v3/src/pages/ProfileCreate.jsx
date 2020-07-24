import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axios from "../axios-instance";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";
import { IntlPropType } from "../customPropTypes";

const ProfileCreate = ({ intl, match }) => {
  const [highestStep, setHighestStep] = useState(1);

  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    if (match.params.step > highestStep) {
      const signupStep = parseInt(match.params.step, 10);

      setHighestStep(signupStep);

      axios.put(`api/profile/${id}?language=${locale}`, {
        signupStep,
      });
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
      step: PropTypes.string,
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
