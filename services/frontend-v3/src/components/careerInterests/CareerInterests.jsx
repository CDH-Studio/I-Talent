import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import CareerInterestsView from "./CareerInterestsView";

const CareerInterests = ({ data }) => {
  const getCareerInterestsInfo = () => {
    const locale = localStorage.getItem("lang") || "en";

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
      description: (data.lookingForNewJob &&
        data.lookingForNewJob.description[locale]) || (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    return [interestedInRemote, lookingForNewJob];
  };

  const getRelocationLocationsInfo = () => {
    const locale = localStorage.getItem("lang") || "en";

    const relocationLocationsInfo = [];
    if (data.relocationLocations) {
      data.relocationLocations.forEach((locationElement) =>
        relocationLocationsInfo.push(locationElement.description[locale])
      );
    }

    return [...relocationLocationsInfo];
  };

  return (
    <CareerInterestsView
      data={data}
      locale={localStorage.getItem("lang") || "en"}
      info={getCareerInterestsInfo()}
      relocationLocationsInfo={getRelocationLocationsInfo()}
    />
  );
};

CareerInterests.propTypes = {
  data: PropTypes.shape({
    interestedInRemote: PropTypes.bool,
    lookingForNewJob: PropTypes.shape({
      description: PropTypes.shape({
        en: PropTypes.string,
        fr: PropTypes.string,
      }),
    }),
    relocationLocations: PropTypes.any,
  }).isRequired,
};

export default CareerInterests;
