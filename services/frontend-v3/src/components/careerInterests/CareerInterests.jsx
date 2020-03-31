import React, { Component } from "react";
import CareerInterestsView from "./CareerInterestsView";
import { FormattedMessage, injectIntl } from "react-intl";

function CareerInterests(props) {
  const getCareerInterestsInfo = dataSource => {
    const data = dataSource.data;
    const locale = localStorage.getItem("lang");

    const interestedInRemote = {
      icon: "mail",
      title: <FormattedMessage id="profile.interested.in.remote" />,
      description:
        data.interestedInRemote === true ? (
          <FormattedMessage id="profile.yes" />
        ) : (
          <FormattedMessage id="profile.no" />
        )
    };
    const lookingForNewJob = {
      icon: "mail",
      title: <FormattedMessage id="profile.looking.for.new.job" />,
      description: (data.lookingForNewJob &&
        data.lookingForNewJob.description[locale]) || (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    return [interestedInRemote, lookingForNewJob];
  };

  const getRelocationLocationsInfo = dataSource => {
    const data = dataSource.data;
    const locale = localStorage.getItem("lang");

    const relocationLocationsInfo = [];
    if (data.relocationLocations) {
      data.relocationLocations.forEach(locationElement =>
        relocationLocationsInfo.push(locationElement.description[locale])
      );
    }

    return [...relocationLocationsInfo];
  };

  return (
    <CareerInterestsView
      data={props.data}
      locale={localStorage.getItem("lang")}
      info={getCareerInterestsInfo(props)}
      relocationLocationsInfo={getRelocationLocationsInfo(props)}
    />
  );
}

export default injectIntl(CareerInterests);
