import { FormattedMessage } from "react-intl";
import { Row, Col, List } from "antd";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const TalentManagementView = ({ data }) => {
  const getTalentManagementDatasource = () => {
    const careerMobility = {
      title: <FormattedMessage id="career.mobility" />,
      description: data.careerMobility ? data.careerMobility.description : "-",
    };

    const talentMatrixResult = {
      title: <FormattedMessage id="talent.matrix.result" />,
      description: data.talentMatrixResult
        ? data.talentMatrixResult.description
        : "-",
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
