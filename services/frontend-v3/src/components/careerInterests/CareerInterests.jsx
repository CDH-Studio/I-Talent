import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import CareerInterestsView from "./CareerInterestsView";
import ProfileCards from "../profileCards/ProfileCards";
import { ProfileInfoPropType } from "../../customPropTypes";

const CareerInterests = ({ data, title, cardName, id, type, editUrl }) => {
  const getCareerInterestsInfo = () => {
    let description = "-";
    if (data.interestedInRemote)
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
      title={title}
      content={
        <CareerInterestsView
          data={data}
          info={getCareerInterestsInfo()}
          relocationLocationsInfo={data.relocationLocations}
        />
      }
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={data.visibleCards.careerInterests}
    />
  );
};

CareerInterests.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  editUrl: PropTypes.string,
};

CareerInterests.defaultProps = {
  data: null,
  type: null,
  editUrl: "",
};

export default CareerInterests;
