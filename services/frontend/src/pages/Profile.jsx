import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import ErrorProfilePage from "../components/errorResult/errorProfilePage";
import ProfileLayout from "../components/layouts/profileLayout/ProfileLayout";
import useAxios from "../utils/useAxios";

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
        ? axios.get(`profile/private/${id}?language=${locale}`)
        : axios.get(`profile/${id}?language=${locale}`);

    apiCalls.push(profile);

    if (id !== userID) {
      apiCalls.push(axios.get(`connections/${id}`));
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
      setName(intl.formatMessage({ id: "hidden.profile" }));
    } else if (loading) {
      setName(intl.formatMessage({ id: "loading" }));
    }
  }, [locale, userDoesNotExist, userIsHidden, loading, intl]);

  useEffect(() => {
    document.title = `${name} | I-Talent`;
  }, [name]);

  if (userDoesNotExist) {
    return (
      <ErrorProfilePage
        subtitleId="profile.not.found.description"
        titleId="profile.not.found"
      />
    );
  }

  if (userIsHidden) {
    return (
      <ErrorProfilePage
        subtitleId="hidden.profile.description"
        titleId="hidden.profile"
      />
    );
  }

  return (
    <ProfileLayout
      connectionStatus={connectionData}
      data={data}
      isLoading={!data}
      isUsersProfile={id === userID}
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
