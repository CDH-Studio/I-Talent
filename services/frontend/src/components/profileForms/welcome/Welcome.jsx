import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../../../utils/useAxios";
import WelcomeView from "./WelcomeView";
import handleError from "../../../functions/handleError";

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

  const { id, name, email } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);
  const axios = useAxios();

  const history = useHistory();

  const skipProfileCreation = async () => {
    try {
      await axios.put(`/api/profile/${id}?language=${locale}`, {
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
      const result = await axios.get(`api/profGen/${id}`, {
        params: {
          name,
          email,
        },
      });
      if (result.data) {
        setGedsProfiles(result.data);
      }
      return 1;
    };

    /* get all required data component */
    const getAllData = async () => {
      try {
        await getGedsProfiles();
        setLoad(true);
        return 1;
      } catch (error) {
        setLoad(false);
        throw error;
      }
    };

    getAllData();
  }, [axios, id, name]);

  return (
    <WelcomeView
      gedsProfiles={gedsProfiles}
      load={load}
      userId={id}
      history={history}
      skipProfileCreation={skipProfileCreation}
    />
  );
};

export default Welcome;
