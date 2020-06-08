import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
const DoneSetup = () => {
  const [load, setLoad] = useState(false);
  const { id } = useSelector((state) => state.user);

  // useEffect to run once component is mounted
  useEffect(() => {
    // get user profile for form drop down
    const getProfileInfo = async () => {
      const url = `${backendAddress}api/profile/private/${localStorage.getItem(
        "userId"
      )}`;
      await axios.get(url);
      return 1;
    };

    // get all required data component
    const getAllData = async () => {
      await getProfileInfo();
      setLoad(true);
      return 1;
    };

    getAllData().catch((error) => handleError(error, "redirect"));
  }, [id]);

  return <DoneSetupView load={load} userId={id} />;
};

export default DoneSetup;
