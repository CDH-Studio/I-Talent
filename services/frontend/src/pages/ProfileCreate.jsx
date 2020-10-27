import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import useAxios from "../utils/useAxios";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";
import { setUserSignupStep } from "../redux/slices/userSlice";

const ProfileCreate = ({ match }) => {
  const axios = useAxios();
  const intl = useIntl();
  const dispatch = useDispatch();

  const { locale } = useSelector((state) => state.settings);
  const { id, signupStep: highestStep } = useSelector((state) => state.user);

  useEffect(() => {
    const signupStep = parseInt(match.params.step, 10);

    if (signupStep > highestStep) {
      dispatch(setUserSignupStep(signupStep));

      axios.put(`api/profile/${id}?language=${locale}`, {
        signupStep,
      });
    }
  }, [highestStep, id, match, locale, axios, dispatch]);

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
