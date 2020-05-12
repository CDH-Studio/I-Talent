import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line import/no-named-as-default-member
import ProfileCardsView from "./ProfileCardsView";
import config from "../../config";

const { backendAddress } = config;

function ProfileCards({ data, title, content, editUrl, cardName, id }) {
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  // useParams returns an object of key/value pairs from URL parameters
  const { newId } = useParams();
  const urlID = newId;

  // get user profile for hidden cards value
  const getProfileInfo = async () => {
    try {
      const url = `${backendAddress}api/profile/${urlID}`;
      // eslint-disable-next-line no-console
      console.log(url);
      const result = await axios.get(url);
      return await setProfileInfo(result.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  // get all required data component
  const getAllData = async () => {
    try {
      await getProfileInfo();
      setLoad(true);
      return 1;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  };

  // useEffect to run once component is mounted
  useEffect(() => {
    getAllData();
  }, []);

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
}

ProfileCards.propTypes = {
  data: PropTypes.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.isRequired,
  editUrl: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProfileCards;
