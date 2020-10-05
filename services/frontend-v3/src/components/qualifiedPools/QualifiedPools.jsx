import React from "react";
import PropTypes from "prop-types";
import QualifiedPoolsView from "./QualifiedPoolsView";
import ProfileCards from "../profileCards/ProfileCards";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const QualifiedPools = ({ data, editableCardBool }) => (
  <ProfileCards
    titleId="profile.qualified.pools"
    cardName="qualifiedPools"
    id="card-profile-qualified-pools"
    editUrl="/profile/edit/personal-growth?tab=qualified-pools"
    data={data}
    editableCardBool={editableCardBool}
    visibility={data.visibleCards.qualifiedPools}
  >
    <QualifiedPoolsView
      lookingJob={data.lookingJob}
      interestedInRemote={data.interestedInRemote}
      relocationLocations={data.relocationLocations}
    />
  </ProfileCards>
);

QualifiedPools.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

QualifiedPools.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default QualifiedPools;
