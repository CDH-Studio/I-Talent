import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAxios from "../utils/axios-instance";
import handleError from "../functions/handleError";
import ProfileLayout from "../components/layouts/profileLayout/ProfileLayout";

const Profile = ({ history, match }) => {
  const [name, setName] = useState("Loading");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionData, setConnectionData] = useState(null);

  const userID = useSelector((state) => state.user.id);
  const { locale } = useSelector((state) => state.settings);
  const { savedFormContent } = useSelector((state) => state.state);
  const { id } = match.params;
  const axios = useAxios();

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
            if (result[0].data && userID !== id) {
              setConnectionData(result[1].data.status);
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

  const changeConnection = async () => {
    if (connectionData) {
      await axios
        .delete(`api/connections/${id}`)
        .catch((error) => handleError(error, "message"));
      setConnectionData(false);
    } else {
      await axios
        .post(`api/connections/${id}`)
        .catch((error) => handleError(error, "message"));
      setConnectionData(true);
    }
  };

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
