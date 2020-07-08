import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../../axios-instance";
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

  const { id, name } = useSelector((state) => state.user);

  const history = useHistory();

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
  }, [id, name]);

  return (
    <WelcomeView
      gedsProfiles={gedsProfiles}
      load={load}
      userId={id}
      history={history}
    />
  );
};

export default Welcome;
