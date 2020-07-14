import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axios from "../axios-instance";
import handleError from "../functions/handleError";
import ProfileLayout from "../components/layouts/profileLayout/ProfileLayout";

const Profile = ({ history, match }) => {
  const [name, setName] = useState("Loading");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionData, setConnectionData] = useState(null);

  const userID = useSelector((state) => state.user.id);
  const { locale } = useSelector((state) => state.settings);
  const { id } = match.params;

  useEffect(() => {
    const fetchProfile = async () => {
      const promiseArray = [];
      const profile =
        id === userID
          ? axios.get(`api/profile/private/${id}?language=${locale}`)
          : axios.get(`api/profile/${id}?language=${locale}`);

      promiseArray.push(profile);

      if (id !== userID) {
        const connectionStatus = axios.get(`api/connections/${id}`);
        promiseArray.push(connectionStatus);
      }
      Promise.all(promiseArray)
        .then((result) => {
          if (result[0].data !== undefined) {
            const profileData = result[0].data;
            setName(`${profileData.firstName} ${profileData.lastName}`);
            setData(profileData);
            if (userID !== id) {
              const connectionStatus = result[1].data;
              const {
                info,
                manager,
                projects,
                skills,
                competencies,
                education,
                experience,
                exFeeder,
              } = profileData.visibleCards;
              profileData.visibleCards = {
                info: !(
                  info === "PRIVATE" ||
                  (info === "CONNECTIONS" && !connectionStatus)
                ),
                manager: !(
                  manager === "PRIVATE" ||
                  (manager === "CONNECTIONS" && !connectionStatus)
                ),
                projects: !(
                  projects === "PRIVATE" ||
                  (projects === "CONNECTIONS" && !connectionStatus)
                ),
                skills: !(
                  skills === "PRIVATE" ||
                  (skills === "CONNECTIONS" && !connectionStatus)
                ),
                competencies: !(
                  competencies === "PRIVATE" ||
                  (competencies === "CONNECTIONS" && !connectionStatus)
                ),
                education: !(
                  education === "PRIVATE" ||
                  (education === "CONNECTIONS" && !connectionStatus)
                ),
                experience: !(
                  experience === "PRIVATE" ||
                  (experience === "CONNECTIONS" && !connectionStatus)
                ),
                exFeeder: !(
                  exFeeder === "PRIVATE" ||
                  (exFeeder === "CONNECTIONS" && !connectionStatus)
                ),
              };
              setConnectionData(connectionStatus);
            }
          }
          setLoading(false);
        })
        .catch((error) => handleError(error, "redirect"));
    };

    if (id === undefined) {
      history.push(`/secured/profile/${userID}`);
    } else {
      fetchProfile();
    }
  }, [history, id, locale, userID]);

  useEffect(() => {
    document.title = `${name} | I-Talent`;
  }, [name]);

  const addConnection = async (urlID) => {
    await axios
      .post(`api/connections/${urlID}`)
      .catch((error) => handleError(error, "message"));
  };

  const removeConnection = async (urlID) => {
    await axios
      .delete(`api/connections/${urlID}`)
      .catch((error) => handleError(error, "message"));
  };

  return (
    <ProfileLayout
      data={data}
      connectionStatus={connectionData}
      privateProfile={id === userID}
      addConnection={addConnection}
      removeConnection={removeConnection}
      loading={loading}
    />
  );
};

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.any,
  }).isRequired,
};

export default Profile;
