import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileCardsView from "./ProfileCardsView";
import config from "../../config";

const { backendAddress } = config;

function ProfileCards(props) {
  const [profileInfo, setProfileInfo] = useState(null);
  const [load, setLoad] = useState(false);

  // useParams returns an object of key/value pairs from URL parameters
  const { id } = useParams();
  const urlID = id;

  // get user profile for hidden cards value
  const getProfileInfo = async () => {
    try {
      const url = `${backendAddress}api/profile/${urlID}`;
      const result = await axios.get(url);
      return await setProfileInfo(result.data);
    } catch (error) {
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
      data={props.data}
      title={props.title}
      content={props.content}
      profileInfo={profileInfo}
      editUrl={props.editUrl}
      load={load}
      cardName={props.cardName}
      getAllData={getAllData}
      id={props.id}
    />
  );
}

export default ProfileCards;
