import React, { useState, useEffect } from "react";
import axios from "axios";
import DoneSetupView from "./DoneSetupView";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetup = ({}) => {
  const [load, setLoad] = useState(false);

  // useEffect to run once component is mounted
  useEffect(() => {
    // get user profile for form drop down
    const getProfileInfo = async () => {
      try {
        const url = `${backendAddress}api/profile/private/${localStorage.getItem(
          "userId"
        )}`;
        await axios.get(url);
        return 1;
      } catch (error) {
        throw Error(error);
      }
    };

    // get all required data component
    const getAllData = async () => {
      try {
        await getProfileInfo();
        setLoad(true);
        return 1;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw error;
      }
    };

    getAllData().catch(error => handleError(error, true, true));
  }, []);

  return <DoneSetupView load={load} />;
};

export default DoneSetup;
