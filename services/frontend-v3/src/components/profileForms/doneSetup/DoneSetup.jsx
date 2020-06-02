import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DoneSetupView from "./DoneSetupView";
import config from "../../../config";

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
      try {
        const url = `${backendAddress}api/profile/private/${id}`;
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
        return 0;
      }
    };

    getAllData();
  }, [id]);

  return <DoneSetupView load={load} userId={id}/>;
};

export default DoneSetup;
