import React from "react";
import { FormattedMessage } from "react-intl";
import CareerInterestsView from "./CareerInterestsView";

function CareerInterests(props) {
  const getCareerInterestsInfo = (dataSource) => {
    const { data } = dataSource;
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

  const getRelocationLocationsInfo = (dataSource) => {
    const { data } = dataSource;
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
      data={props.data}
      locale={localStorage.getItem("lang") || "en"}
      info={getCareerInterestsInfo(props)}
      relocationLocationsInfo={getRelocationLocationsInfo(props)}
    />
  );
}

export default CareerInterests;
