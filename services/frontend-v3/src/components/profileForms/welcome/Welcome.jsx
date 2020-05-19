import React, { useState, useEffect } from "react";
import axios from "axios";
import WelcomeView from "./WelcomeView";
import config from "../../../config";

const { backendAddress } = config;

/**
 *  Welcome(props)
 *
 *  Controller for the welcome form.
 *  It gathers a list of GEDs profile that matches the registered user
 *  User can pre-populate profile or start from scratch
 */
function Welcome() {
  const [load, setLoad] = useState(false);
  const [gedsProfiles, setGedsProfiles] = useState([]);
  const [gedsProfileNetworkError, setGedsProfileNetworkError] = useState(null);

  /* useEffect to run once component is mounted */
  useEffect(() => {
    /*
     * get Geds Profiles
     *
     * Get GEDs profile that matches registered user
     */
    const getGedsProfiles = async () => {
      try {
        // Get info from GEDS
        const result = await axios.get(
          `${backendAddress}api/profGen/${localStorage.getItem("userId")}`
        );
        setGedsProfiles(result.data);
        return 1;
      } catch (error) {
        setGedsProfileNetworkError(error);
        // eslint-disable-next-line no-console
        console.log(error);
        return 0;
      }
    };

    /* get all required data component */
    const getAllData = async () => {
      try {
        await getGedsProfiles();
        setLoad(true);
        return 1;
      } catch (error) {
        setLoad(false);
        // eslint-disable-next-line no-console
        console.log(error);
        return 0;
      }
    };

    getAllData();
  }, []);

  return (
    <WelcomeView
      gedsProfiles={gedsProfiles}
      gedsProfileNetworkError={gedsProfileNetworkError}
      load={load}
    />
  );
}

export default Welcome;
