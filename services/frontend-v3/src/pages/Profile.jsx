import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../config";
import handleError from "../functions/handleError";
import ProfileSkeleton from "../components/profileSkeleton/ProfileSkeleton";
import ProfileLayout from "../components/layouts/profileLayout/ProfileLayout";

const { backendAddress } = config;

const Profile = ({ history, match }) => {
  const [name, setName] = useState("Loading");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userID = useSelector(state => state.user.id);

  const updateProfileInfo = useCallback(async (id) => {
    // Send private data to ProfileLayout component, when current user
    // is looking at his own profile
    if (id === userID) {
      const fetchedData = await axios
        .get(`${backendAddress}api/profile/private/${id}`)
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });

      return fetchedData;
    }
    // Send public data to ProfileLayout component, when current user
    // is looking at someone else profile
    const fetchedData = await axios
      .get(`${backendAddress}api/profile/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        if (
          !error.isAxiosError ||
          !error.response ||
          !error.response.status === 404
        ) {
          throw error;
        }
      });
    return fetchedData;
  }, [userID]);

  const goto = useCallback((link) => history.push(link), [history]);

  useEffect(() => {
    const { id } = match.params;

    if (id === undefined) {
      goto(`/secured/profile/${userID}`);
      // this.forceUpdate();
    }

    if (data === null) {
      updateProfileInfo(id)
        .then((fetchedData) => {
          if (fetchedData !== undefined) {
            setName(`${fetchedData.firstName} ${fetchedData.lastName}`);
          }
          setData(fetchedData);
          setLoading(false);
        })
        .catch((error) => handleError(error, "redirect"));
    }
  }, [data, goto, match.params, updateProfileInfo, userID]);

  useEffect(() => {
    document.title = `${name} | I-Talent`;
  }, [name]);

  if (!loading) {
    return <ProfileLayout data={data} />;
  }

  return <ProfileSkeleton />;
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
