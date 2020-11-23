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
    const apiCalls = [];
    const profile =
      id === userID
        ? axios.get(`api/profile/private/${id}?language=${locale}`)
        : axios.get(`api/profile/${id}?language=${locale}`);

    apiCalls.push(profile);

    if (id !== userID) {
      apiCalls.push(axios.get(`api/connections/${id}`));
    }

    try {
      const [profileData, connectionsData] = await Promise.all(apiCalls);

      if (profileData.data !== undefined) {
        setName(`${profileData.data.firstName} ${profileData.data.lastName}`);
        setData(profileData.data);
        if (profileData.data && userID !== id) {
          setConnectionData(connectionsData.data.status);
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
