import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DoneSetupView from "./DoneSetupView";
import useAxios from "../../../utils/useAxios";
import handleError from "../../../functions/handleError";

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetup = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);
  const axios = useAxios();
  const history = useHistory();

  /**
   * Get user profile
   */
  const getProfileInfo = useCallback(async () => {
    const result = await axios.get(
      `api/profile/private/${id}?language=${locale}`
    );
    setProfileInfo(result.data);
  }, [axios, id, locale]);

  // useEffect to run once component is mounted
  useEffect(() => {
    // get all required data component
    Promise.all([getProfileInfo()])
      .then(() => {
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
        handleError(error, "redirect", history);
      });
  }, [getProfileInfo, history]);

  return (
    <DoneSetupView
      userId={id}
      load={load}
      visibleCards={load ? profileInfo.visibleCards : null}
    />
  );
};

export default DoneSetup;
