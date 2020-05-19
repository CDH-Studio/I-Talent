import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileCardsView from "./ProfileCardsView";
import config from "../../config";
import { ProfileInfoPropType } from "../../customPropTypes";

const { backendAddress } = config;

const ProfileCards = ({ data, title, content, editUrl, cardName, id }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [networkErrors, setNetworkErrors] = useState([]);

  // useParams returns an object of key/value pairs from URL parameters
  const urlID = useParams().id;

  // get user profile for hidden cards value
  const getProfileInfo = useCallback(async () => {
    try {
      const url = `${backendAddress}api/profile/${urlID}`;
      // eslint-disable-next-line no-console
      console.log(url);
      const result = await axios.get(url);
      return setProfileInfo(result.data);
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
  }, [urlID]);

  /*
   * Handle Visibility Toggle
   *
   * Handle card visibility toggle by updating state and saving state to backend
   */
  const handleVisibilityToggle = async () => {
    // Update visibleCards state in profile
    try {
      // Get current card visibility status from db
      const url = `${backendAddress}api/profile/${urlID}`;
      const result = await axios.get(url);

      try {
        const { visibleCards } = result.data;
        // change the stored value
        const cardNameToBeModified = cardName;
        visibleCards[cardNameToBeModified] = !disabled;
        setDisabled(visibleCards[cardNameToBeModified]);
        // save toggle value in db
        await axios.put(`${backendAddress}api/profile/${urlID}`, {
          visibleCards,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } catch (error) {
      setNetworkErrors(oldArray => oldArray.concat(error));
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  // get all required data component
  const getAllData = useCallback(async () => {
    try {
      await getProfileInfo();
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
      handleVisibilityToggle={handleVisibilityToggle}
      networkErrors={networkErrors}
      disabled={disabled}
      setDisabled={setDisabled}
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
