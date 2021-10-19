import { FormattedMessage } from "react-intl";
import { List, Tag, Typography } from "antd";
import PropTypes from "prop-types";

import "./JobMobilityCardView.less";

const { Title, Text } = Typography;

const JobMobilityCardView = ({
  interestedInRemote,
  lookingJob,
  relocationLocations,
}) => {
  /**
   * Generate Interest in Teleworking
   * @returns {{description: React.ReactElement, title: React.ReactElement}} - object
   */
  const generateInterestInTelework = () => {
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
   * @returns {{description: React.ReactElement, title: React.ReactElement}} - object
   */
  const generateInterestedInNewJob = () => ({
    description: (lookingJob && lookingJob.description) || (
      <FormattedMessage id="not.provided" />
    ),
    title: <FormattedMessage id="looking.for.new.job" />,
  });

  /**
   * Generate list of relocation locations using tags
   * @returns {{description: React.ReactElement, title: React.ReactElement}} - object
   */
  const generateRelocationLocations = () => {
    const tagList =
      relocationLocations && relocationLocations.length > 0 ? (
        relocationLocations.map(({ id, city, province }) => (
          <Tag key={id} color="#727272">
            {city}, {province}
          </Tag>
        ))
      ) : (
        <FormattedMessage id="not.provided" />
      );

    return {
      description: tagList,
      title: <FormattedMessage id="willing.to.relocate.to" />,
    };
  };

  /**
   * Generate card data into a single array
   * @returns {Array<{description: React.ReactElement, title: React.ReactElement}>} - Array of objects
   */
  const getCareerInterestsInfo = () => [
    generateInterestInTelework(),
    generateInterestedInNewJob(),
    generateRelocationLocations(),
  ];

  return (
    <List
      dataSource={getCareerInterestsInfo()}
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
