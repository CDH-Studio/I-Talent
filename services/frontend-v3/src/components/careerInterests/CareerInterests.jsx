import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import CareerInterestsView from "./CareerInterestsView";
import ProfileCards from "../profileCards/ProfileCards";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const CareerInterests = ({ data, type }) => {
  const getCareerInterestsInfo = () => {
    let description = "-";
    if (data.interestedInRemote) {
      description = <FormattedMessage id="profile.yes" />;
    } else if (data.interestedInRemote === false) {
      description = <FormattedMessage id="profile.no" />;
    }

    const interestedInRemote = {
      icon: "mail",
      title: <FormattedMessage id="profile.interested.in.remote" />,
      description,
    };
    const lookingForNewJob = {
      icon: "mail",
      title: <FormattedMessage id="profile.looking.for.new.job" />,
      description: (data.lookingJob && data.lookingJob.description) || "-",
    };

    return [interestedInRemote, lookingForNewJob];
  };

  return (
    <ProfileCards
      titleId="profile.career.interests"
      content={
        <CareerInterestsView
          data={data}
          info={getCareerInterestsInfo()}
          relocationLocationsInfo={data.relocationLocations}
        />
      }
      cardName="careerInterests"
      id="card-profile-career-interests"
      editUrl="/secured/profile/edit/personal-growth"
      data={data}
      type={type}
      visible={data.visibleCards.careerInterests}
    />
  );
};

CareerInterests.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

CareerInterests.defaultProps = {
  data: null,
  type: null,
};

export default CareerInterests;
