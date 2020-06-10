import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import handleError from "../../functions/handleError";
import ProfileCardsView from "./ProfileCardsView";
import config from "../../config";
import { ProfileInfoPropType } from "../../customPropTypes";

const { backendAddress } = config;

const ProfileCards = ({
  data,
  title,
  content,
  editUrl,
  cardName,
  id,
  forceDisabled,
}) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  const history = useHistory();

  // useParams returns an object of key/value pairs from URL parameters
  const urlID = useParams().id;

  // get user profile for hidden cards value
  const getProfileInfo = useCallback(async () => {
    const url = `${backendAddress}api/profile/${urlID}`;
    const result = await axios.get(url);
    return setProfileInfo(result.data);
  }, [urlID]);

  // get all required data component
  const getAllData = useCallback(async () => {
    try {
      await getProfileInfo();
      setLoad(true);
      return 1;
    } catch (error) {
      handleError(error, "redirect");
      return 0;
    }
  }, [getProfileInfo]);

  // useEffect to run once component is mounted
  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <ProfileCardsView
      data={data}
      title={title}
      content={content}
      profileInfo={profileInfo}
      editUrl={editUrl}
      load={load}
      cardName={cardName}
      getAllData={getAllData}
      id={id}
      history={history}
      forceDisabled={forceDisabled}
    />
  );
};

ProfileCards.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  content: PropTypes.element,
  editUrl: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  forceDisabled: PropTypes.bool,
};

ProfileCards.defaultProps = {
  data: null,
  content: null,
  forceDisabled: false,
};

export default ProfileCards;
