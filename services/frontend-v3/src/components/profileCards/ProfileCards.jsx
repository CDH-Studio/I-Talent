import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import ProfileCardsView from "./ProfileCardsView";
import { ProfileInfoPropType } from "../../customPropTypes";

const ProfileCards = ({
  data,
  title,
  content,
  editUrl,
  cardName,
  id,
  forceDisabled,
}) => {
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
