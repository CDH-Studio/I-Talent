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
  type,
  visible,
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
      type={type}
      visible={visible}
    />
  );
};

ProfileCards.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  content: PropTypes.element,
  editUrl: PropTypes.string,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
};

ProfileCards.defaultProps = {
  data: null,
  content: null,
  editUrl: null,
  type: null,
  visible: null,
};

export default ProfileCards;
