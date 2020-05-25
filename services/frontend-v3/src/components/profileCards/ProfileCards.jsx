import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axios from "axios";
import handleError from "./../../functions/handleError";
import ProfileCardsView from "./ProfileCardsView";
import config from "../../config";
import { ProfileInfoPropType } from "../../customPropTypes";

const { backendAddress } = config;

const ProfileCards = ({ data, title, content, editUrl, cardName, id }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  // useParams returns an object of key/value pairs from URL parameters
  const urlID = useParams().id;

  // get user profile for hidden cards value
  const getProfileInfo = useCallback(async () => {
    try {
      const url = `${backendAddress}api/profile/${urlID}`;
      const result = await axios.get(url);
      return setProfileInfo(result.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  }, [urlID]);

  // get all required data component
  const getAllData = useCallback(async () => {
    try {
      await getProfileInfo().catch(error =>
        handleError(error, true, "redirect")
      );
      setLoad(true);
      return 1;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
    />
  );
};

ProfileCards.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  content: PropTypes.element.isRequired,
  editUrl: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

ProfileCards.defaultProps = {
  data: null,
};

export default ProfileCards;
