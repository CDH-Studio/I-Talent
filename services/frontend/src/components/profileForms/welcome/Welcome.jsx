import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import handleError from "../../../functions/handleError";
import useAxios from "../../../utils/useAxios";
import WelcomeView from "./WelcomeView";

/**
 *  Welcome(props)
 *
 *  Controller for the welcome form.
 *  It gathers a list of GEDs profile that matches the registered user
 *  User can pre-populate profile or start from scratch
 */
const Welcome = () => {
  const [load, setLoad] = useState(false);
  const [gedsProfiles, setGedsProfiles] = useState();

  const { id, email } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);
  const axios = useAxios();

  const history = useHistory();

  const skipProfileCreation = async () => {
    try {
      await axios.put(`/profile/${id}?language=${locale}`, {
        signupStep: 8,
        status: "HIDDEN",
      });
      history.push("/");
    } catch (error) {
      handleError(error, "message", history);
    }
  };

  /* useEffect to run once component is mounted */
  useEffect(() => {
    /*
     * get Geds Profiles
     *
     * Get GEDs profile that matches registered user
     */
    const getGedsProfiles = async () => {
      // Get info from GEDS
      const result = await axios.get(`profGen`, {
        params: {
          email,
        },
      });
      if (result.data) {
        setGedsProfiles(result.data);
        setLoad(false);
      }
      return 1;
    };

    /* get all required data component */
    const getAllData = async () => {
      try {
        setLoad(true);
        await getGedsProfiles();
        return 1;
      } catch (error) {
        setLoad(false);
        throw error;
      }
    };

    getAllData();
  }, [axios, id, email]);

  return (
    <WelcomeView
      gedsProfiles={gedsProfiles}
      history={history}
      load={load}
      skipProfileCreation={skipProfileCreation}
      userId={id}
    />
  );
};

export default Welcome;
