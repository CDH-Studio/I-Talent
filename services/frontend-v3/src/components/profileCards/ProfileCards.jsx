import React from "react";
import ProfileCardsView from "./ProfileCardsView";

function ProfileCards(props) {
  return (
    <ProfileCardsView
      data={props.data}
      title={props.title}
      content={props.content}
    />
  );
}

export default ProfileCards;
