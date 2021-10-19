import { FormattedMessage } from "react-intl";
import { List, Typography } from "antd";
import PropTypes from "prop-types";

import "./TalentManagementCardView.less";

const { Title, Text } = Typography;

const TalentManagementCardView = ({ careerMobility, talentMatrixResult }) => {
  /**
   * Generate talent management results
   * @returns {Array<{description: React.ReactElement, title: React.ReactElement}>} - Array of objects
   */
  const generateTalentManagementResults = () => {
    const careerMobilityObject = {
      description: careerMobility ? (
        careerMobility.description
      ) : (
        <FormattedMessage id="not.provided" />
      ),
      title: <FormattedMessage id="career.mobility" />,
    };

    const talentMatrixResultObject = {
      description: talentMatrixResult ? (
        talentMatrixResult.description
      ) : (
        <FormattedMessage id="not.provided" />
      ),
      title: <FormattedMessage id="talent.matrix.result" />,
    };

    return [careerMobilityObject, talentMatrixResultObject];
  };

  return (
    <List
      dataSource={generateTalentManagementResults()}
      renderItem={(item) => (
        <List.Item className="px-0 talent-management-list-item">
          <Title className="talent-management-title mb-0" level={4}>
            {item.title}
          </Title>
          <Text type="secondary">{item.description}</Text>
        </List.Item>
      )}
      size="small"
    />
  );
};

TalentManagementCardView.propTypes = {
  careerMobility: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
  }),
  talentMatrixResult: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
  }),
};

TalentManagementCardView.defaultProps = {
  careerMobility: null,
  talentMatrixResult: null,
};

export default TalentManagementCardView;
