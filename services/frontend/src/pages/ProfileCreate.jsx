import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import useAxios from "../utils/useAxios";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";
import { setUserSignupStep } from "../redux/slices/userSlice";

const ProfileCreate = ({ step }) => {
  const axios = useAxios();
  const intl = useIntl();
  const dispatch = useDispatch();

  const { locale } = useSelector((state) => state.settings);
  const { id, signupStep } = useSelector((state) => state.user);

  useEffect(() => {
    if (step > signupStep) {
      dispatch(setUserSignupStep(step));
      axios.put(`api/profile/${id}?language=${locale}`, {
        signupStep: step,
      });
    }
  }, [id, locale, axios, dispatch, step, signupStep]);

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: "create.profile",
    })} | I-Talent`;
  }, [intl]);

  return <CreateProfileLayout step={step} highestStep={signupStep} />;
};

ProfileCreate.propTypes = {
  step: PropTypes.number.isRequired,
};

export default ProfileCreate;
