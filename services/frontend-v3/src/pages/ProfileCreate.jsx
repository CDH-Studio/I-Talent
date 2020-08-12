import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import useAxios from "../utils/axios-instance";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";

const ProfileCreate = ({ match }) => {
  const [highestStep, setHighestStep] = useState(1);
  const axios = useAxios();
  const intl = useIntl();

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
  }, [highestStep, id, match, locale, axios]);

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
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string,
    }),
  }),
};

ProfileCreate.defaultProps = {
  match: {
    params: undefined,
  },
};

export default ProfileCreate;
