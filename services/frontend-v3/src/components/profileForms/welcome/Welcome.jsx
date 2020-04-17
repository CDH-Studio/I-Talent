import React, { useState, useEffect } from "react";
import WelcomeView from "./WelcomeView";
import axios from "axios";
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
        let result = await axios.get(
          backendAddress + "api/profGen/" + localStorage.getItem("userId")
        );
        setGedsProfiles(result.data);
        return 1;
      } catch (error) {
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
        console.log(error);
        return 0;
      }
    };

    getAllData();
  }, []);

  return <WelcomeView gedsProfiles={gedsProfiles} load={load} />;
}

export default Welcome;
