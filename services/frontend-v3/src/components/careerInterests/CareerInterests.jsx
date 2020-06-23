import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import CareerInterestsView from "./CareerInterestsView";

const CareerInterests = ({ data }) => {
  const getCareerInterestsInfo = () => {
    const interestedInRemote = {
      icon: "mail",
      title: <FormattedMessage id="profile.interested.in.remote" />,
      description:
        data.interestedInRemote === true ? (
          <FormattedMessage id="profile.yes" />
        ) : (
          <FormattedMessage id="profile.no" />
        ),
    };
    const lookingForNewJob = {
      icon: "mail",
      title: <FormattedMessage id="profile.looking.for.new.job" />,
      description: (data.lookingJob && data.lookingJob.description) || (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    return [interestedInRemote, lookingForNewJob];
  };

  return (
    <CareerInterestsView
      data={data}
      info={getCareerInterestsInfo()}
      relocationLocationsInfo={data.relocationLocations}
    />
  );
};

CareerInterests.propTypes = {
  data: PropTypes.shape({
    interestedInRemote: PropTypes.bool,
    lookingJob: PropTypes.shape({
      description: PropTypes.string,
    }),
    relocationLocations: PropTypes.any,
  }).isRequired,
};

export default CareerInterests;
