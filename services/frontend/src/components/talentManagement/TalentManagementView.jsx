import { FormattedMessage } from "react-intl";
import { Col, List, Row, Typography } from "antd";

import { ProfileInfoPropType } from "../../utils/customPropTypes";

import "./TalentManagementView.less";

const { Title, Text } = Typography;

const TalentManagementView = ({ careerMobility, talentMatrixResult }) => {
  /**
   * Generate talent management results
   * @returns {Array<{description: string, title: string}>} - Array of objects
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
    <Row>
      <Col lg={24} xs={24}>
        <List
          dataSource={generateTalentManagementResults()}
          renderItem={(item) => (
            <List.Item className="px-0 talent-management-list-item">
              <Title
                className="d-block talent-management-title mb-0 "
                level={4}
              >
                {item.title}
              </Title>
              <Text type="secondary">{item.description}</Text>
            </List.Item>
          )}
          size="small"
        />
      </Col>
    </Row>
  );
};

TalentManagementView.propTypes = {
  careerMobility: ProfileInfoPropType,
  talentMatrixResult: ProfileInfoPropType,
};

TalentManagementView.defaultProps = {
  careerMobility: null,
  talentMatrixResult: null,
};

export default TalentManagementView;
