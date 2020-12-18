import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import useAxios from "../utils/useAxios";
import handleError from "../functions/handleError";
import ProfileLayout from "../components/layouts/profileLayout/ProfileLayout";
import ErrorProfilePage from "../components/errorResult/errorProfilePage";

const Profile = ({ history, match }) => {
  const intl = useIntl();

  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionData, setConnectionData] = useState(true);
  const [userDoesNotExist, setUserDoesNotExist] = useState(false);
  const [userIsHidden, setUserIsHidden] = useState(false);

  const userID = useSelector((state) => state.user.id);
  const { locale } = useSelector((state) => state.settings);
  const { savedFormContent } = useSelector((state) => state.state);
  const { id } = match.params;
  const axios = useAxios();

  const fetchProfile = useCallback(async () => {
    setUserDoesNotExist(false);
    setUserIsHidden(false);
    const apiCalls = [
      axios.get(`api/profile/${id}?language=${locale}`), 
      axios.get(`api/profile/${id}/competencies?language=${locale}`), 
      axios.get(`api/profile/${id}/developmentalGoals?language=${locale}`), 
      axios.get(`api/profile/${id}/educations?language=${locale}`), 
      axios.get(`api/profile/${id}/experiences?language=${locale}`), 
      axios.get(`api/profile/${id}/mentorshipSkills?language=${locale}`), 
      axios.get(`api/profile/${id}/qualifiedPools`), 
      axios.get(`api/profile/${id}/relocationLocations?language=${locale}`), 
      axios.get(`api/profile/${id}/secondLangProfs`), 
      axios.get(`api/profile/${id}/skills?language=${locale}`)
    ];

    if (id !== userID) {
      apiCalls.push(axios.get(`api/connections/${id}`));
    }

    try {
      const [
        profile, 
        competencies, 
        developmentalGoals, 
        educations, 
        experiences,
        mentorshipSkills,
        qualifiedPools,
        relocationLocations,
        secondLangProfs,
        skills,
        connections,
      ] = await Promise.all(apiCalls);

      if (profile.data !== undefined) {
        setName(`${profile.data.firstName} ${profile.data.lastName}`);
        setData({
          ...profile.data,
          competencies: competencies.data,
          developmentalGoals: developmentalGoals.data,
          educations: educations.data,
          experiences: experiences.data,
          mentorshipSkills: mentorshipSkills.data,
          qualifiedPools: qualifiedPools.data,
          relocationLocations: relocationLocations.data,
          secondLangProfs: secondLangProfs.data,
          skills: skills.data,
        });
        
        if (profile.data && userID !== id) {
          setConnectionData(connections.data.status);
        }
      }

      setLoading(false);
    } catch (error) {
      if (error.message.includes("404")) {
        setUserIsHidden(true);
      } else {
        setUserDoesNotExist(true);
      }
    }
  }, [axios, id, locale, userID]);

  useEffect(() => {
    if (id === undefined) {
      history.push(`/profile/${userID}`);
    } else {
      fetchProfile();
    }
  }, [fetchProfile, history, id, locale, userID]);

  useEffect(() => {
    setUserDoesNotExist(false);
    setUserIsHidden(false);
  }, [history]);

  useEffect(() => {
    if (userDoesNotExist) {
      setName(intl.formatMessage({ id: "not.found" }));
    } else if (userIsHidden) {
      setName(intl.formatMessage({ id: "profile.hidden" }));
    } else if (loading) {
      setName(intl.formatMessage({ id: "loading" }));
    }
  }, [locale, userDoesNotExist, userIsHidden, loading, intl]);

  useEffect(() => {
    document.title = `${name} | I-Talent`;
  }, [name]);

  const changeConnection = async () => {
    if (connectionData) {
      await axios
        .delete(`api/connections/${id}`)
        .catch((error) => handleError(error, "message", history));
      setConnectionData(false);
    } else {
      await axios
        .post(`api/connections/${id}`)
        .catch((error) => handleError(error, "message", history));
      setConnectionData(true);
    }
  };

  if (userDoesNotExist) {
    return (
      <ErrorProfilePage
        titleId="profile.not.found"
        subtitleId="profile.not.found.description"
      />
    );
  }

  if (userIsHidden) {
    return (
      <ErrorProfilePage
        titleId="profile.hidden"
        subtitleId="profile.hidden.description"
      />
    );
  }

  return (
    <ProfileLayout
      data={data}
      connectionStatus={connectionData}
      privateProfile={id === userID}
      changeConnection={changeConnection}
      loading={loading}
      savedFormContent={savedFormContent}
    />
  );
};

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Profile;
