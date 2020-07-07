import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import ProfileCardsView from "./ProfileCardsView";
import { ProfileInfoPropType } from "../../customPropTypes";

const ProfileCards = ({ data, title, content, editUrl, cardName, id }) => {
  const history = useHistory();

  return (
    <ProfileCardsView
      title={title}
      content={content}
      profileInfo={data}
      editUrl={editUrl}
      cardName={cardName}
      id={id}
      history={history}
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
};

ProfileCards.defaultProps = {
  data: null,
  content: null,
};

export default ProfileCards;
