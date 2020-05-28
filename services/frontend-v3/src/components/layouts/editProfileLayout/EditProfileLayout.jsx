import React from "react";
import PropTypes from "prop-types";
import { HistoryPropType } from "../../../customPropTypes";
import EditProfileLayoutView from "./EditProfileLayoutView";

/**
 *  EditProfileLayout(props)
 *  Controller for the Edit Profile Layout.
 */
const EditProfileLayout = ({ step, history }) => {
  return <EditProfileLayoutView formStep={step} history={history} />;
};

EditProfileLayout.propTypes = {
  step: PropTypes.string.isRequired,
  history: HistoryPropType.isRequired,
};

export default EditProfileLayout;
