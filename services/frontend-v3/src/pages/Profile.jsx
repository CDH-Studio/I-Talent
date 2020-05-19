import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import config from "../config";
import ProfileSkeleton from "../components/profileSkeleton/ProfileSkeleton";
import ProfileLayout from "../components/layouts/profileLayout/ProfileLayout";

const { backendAddress } = config;

const Profile = ({ history, match, changeLanguage }) => {
  const [name, setName] = useState("Loading");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkErrors, setNetworkErrors] = useState([]);

  const updateProfileInfo = async id => {
    const userID = localStorage.getItem("userId");

    // Send private data to ProfileLayout component, when current user
    // is looking at his own profile
    if (id === userID) {
      const fetchedData = await axios
        .get(`${backendAddress}api/private/profile/${id}`)
        .then(res => res.data)
        // eslint-disable-next-line no-console
        .catch(error => {
          setNetworkErrors(oldArray => oldArray.concat(error));
          // eslint-disable-next-line no-console
          console.error(error);
          return 0;
        });
      return fetchedData;
    }
    // Send public data to ProfileLayout component, when current user
    // is looking at someone else profile
    const fetchedData = await axios
      .get(`${backendAddress}api/profile/${id}`)
      .then(res => res.data)
      // eslint-disable-next-line no-console
      .catch(error => {
        setNetworkErrors(oldArray => oldArray.concat(error));
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error(error);
      });
    return fetchedData;
  };

  const goto = useCallback(link => history.push(link), [history]);

  useEffect(() => {
    const { id } = match.params;

    if (id === undefined) {
      goto(`/secured/profile/${localStorage.getItem("userId")}`);
      // this.forceUpdate();
    }

    if (data === null) {
      updateProfileInfo(id).then(fetchedData => {
        if (fetchedData !== undefined) {
          setName(`${fetchedData.firstName} ${fetchedData.lastName}`);
          setData(fetchedData);
          setLoading(false);
        }
      });
    }
  }, [data, goto, match.params]);

  useEffect(() => {
    document.title = `${name} | I-Talent`;
  }, [name]);

  if (!loading) {
    return (
      <ProfileLayout
        changeLanguage={changeLanguage}
        data={data}
        networkErrors={networkErrors}
      />
    );
  }

  return <ProfileSkeleton changeLanguage={changeLanguage} />;
};

Profile.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.any,
  }).isRequired,
};

export default Profile;
