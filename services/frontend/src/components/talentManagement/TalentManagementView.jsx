import { FormattedMessage } from "react-intl";
import { Col, List, Row } from "antd";

import { ProfileInfoPropType } from "../../utils/customPropTypes";

const TalentManagementView = ({ data }) => {
  const getTalentManagementDatasource = () => {
    const careerMobility = {
      description: data.careerMobility ? data.careerMobility.description : "-",
      title: <FormattedMessage id="career.mobility" />,
    };

    const talentMatrixResult = {
      description: data.talentMatrixResult
        ? data.talentMatrixResult.description
        : "-",
      title: <FormattedMessage id="talent.matrix.result" />,
    };

    return [careerMobility, talentMatrixResult];
  };

  return (
    <Row>
      <Col lg={24} xs={24}>
        <List
          dataSource={getTalentManagementDatasource()}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                description={item.description}
                title={item.title}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

TalentManagementView.propTypes = {
  data: ProfileInfoPropType,
};

TalentManagementView.defaultProps = {
  data: null,
};

export default TalentManagementView;
