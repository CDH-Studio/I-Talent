import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { List, Typography } from "antd";
import PropTypes from "prop-types";

import TagList from "../../tagList/TagList";

import "./JobMobilityCardView.less";

const { Title, Text } = Typography;

/**
 * Generate list of relocation locations using tags
 * @param {Object[]} relocationLocations - Objects describing the relocation location
 * @param {string} relocationLocations[].id - Unique id of the location
 * @param {string} relocationLocations[].name - location
 * @returns {{description: React.ReactElement, title: React.ReactElement}} - object
 */
const generateRelocationLocations = (relocationLocations) => {
  const tagList =
    relocationLocations && relocationLocations.length > 0 ? (
      <TagList data={relocationLocations} tagStyle="secondary" />
    ) : (
      <FormattedMessage id="not.provided" />
    );

  return {
    description: tagList,
    title: <FormattedMessage id="willing.to.relocate.to" />,
  };
};

/**
 * Generate Interest in Teleworking
 * @param {boolean} interestedInRemote - is user interested in working remote
 * @returns {{description: React.ReactElement, title: React.ReactElement}} - object
 */
const generateInterestInTelework = (interestedInRemote) => {
  let description = <FormattedMessage id="not.provided" />;

  if (interestedInRemote) {
    description = <FormattedMessage id="yes" />;
  } else if (interestedInRemote === false) {
    description = <FormattedMessage id="no" />;
  }

  return {
    description,
    title: <FormattedMessage id="interested.in.remote" />,
  };
};

/**
 * Generate Interest in new job
 * @param {string} lookingJob - status of job search
 * @returns {{description: React.ReactElement, title: React.ReactElement}} - object
 */
const generateInterestedInNewJob = (lookingJob) => ({
  description: (lookingJob && lookingJob.description) || (
    <FormattedMessage id="not.provided" />
  ),
  title: <FormattedMessage id="looking.for.new.job" />,
});

const JobMobilityCardView = ({
  interestedInRemote,
  lookingJob,
  relocationLocations,
}) => {
  /**
   * Generate card data into a single array
   * @returns {Array<{description: React.ReactElement, title: React.ReactElement}>} - Array of objects
   */
  const careerInterestsInfo = useMemo(
    () => [
      generateInterestInTelework(interestedInRemote),
      generateInterestedInNewJob(lookingJob),
      generateRelocationLocations(relocationLocations),
    ],
    [interestedInRemote, lookingJob, relocationLocations]
  );

  return (
    <List
      dataSource={careerInterestsInfo}
      itemLayout="horizontal"
      renderItem={(item) => (
        <List.Item className="job-mobility-list-item px-0">
          <Title className="d-block job-mobility-list-title mb-0" level={4}>
            {item.title}
          </Title>
          <Text type="secondary">{item.description}</Text>
        </List.Item>
      )}
      size="small"
    />
  );
};

JobMobilityCardView.propTypes = {
  interestedInRemote: PropTypes.bool,
  lookingJob: PropTypes.shape({
    description: PropTypes.string,
  }),
  relocationLocations: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string,
      id: PropTypes.string,
      province: PropTypes.string,
    })
  ),
};

JobMobilityCardView.defaultProps = {
  interestedInRemote: undefined,
  lookingJob: undefined,
  relocationLocations: undefined,
};

export default JobMobilityCardView;
