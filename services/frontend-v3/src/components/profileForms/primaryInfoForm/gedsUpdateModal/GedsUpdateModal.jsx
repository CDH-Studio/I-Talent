import React from "react";
import PropTypes from "prop-types";
import GedsUpdateModalView from "./GedsUpdateModalView";

const GedsUpdateModal = ({ visibility, profile, setVisibility }) => {
  return (
    <GedsUpdateModalView
      visibility={visibility}
      profile={profile}
      setVisibility={setVisibility}
    />
  );
};

GedsUpdateModal.propTypes = {
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

export default GedsUpdateModal;
