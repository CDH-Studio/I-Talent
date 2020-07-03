import React from "react";
import PropTypes from "prop-types";
import FriendsView from "./FriendsView";

const Friends = ({ data }) => {
  return <FriendsView friends={data.friends} />;
};

Friends.propTypes = {
  data: PropTypes.shape({
    friends: PropTypes.array,
  }).isRequired,
};

export default Friends;
