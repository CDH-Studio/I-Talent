import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import CareerInterestsView from "./CareerInterestsView";
import ProfileCards from "../profileCards/ProfileCards";

const CareerInterests = ({
  data,
  title,
  cardName,
  id,
  type,
  visible,
  editUrl,
}) => {
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
      visible={visible}
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
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
  editUrl: PropTypes.string,
};

CareerInterests.defaultProps = {
  type: null,
  visible: null,
  editUrl: "",
};

export default CareerInterests;
