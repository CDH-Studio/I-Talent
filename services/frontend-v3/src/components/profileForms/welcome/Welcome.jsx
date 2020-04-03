import React, { useState, useEffect } from "react";
import WelcomeView from "./WelcomeView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

/**
 *  LangProficiencyForm(props)
 *  Controller for the EmploymentDataFormView.
 *  It gathers the required data for rendering the component
 */
function Welcome() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [skillOptions, setSkillOptions] = useState(null);
  const [competencyOptions, setCompetencyOptions] = useState(null);
  const [load, setLoad] = useState(false);
  const [gedsProfiles, setGedsProfiles] = useState();
  const [savedCompetencies, setSavedCompetencies] = useState();
  const [savedSkills, setSavedSkills] = useState();
  const [savedMentorshipSkills, setSavedMentorshipSkills] = useState();

  /* useEffect to run once component is mounted */
  useEffect(() => {
    /*
     * Geds Get
     *
     * Generates profile using data collected from GEDS
     */
    const gedsGet = async () => {
      try {
        // Get info from GEDS
        let result = await axios.get(
          backendAddress + "api/profGen/" + localStorage.getItem("userId")
        );
        console.log(result.data);
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
        await gedsGet();
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
