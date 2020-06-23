import React from "react";
import { FormattedMessage } from "react-intl";
import { Row, Col, List } from "antd";
import { ProfileInfoPropType } from "../../customPropTypes";

const TalentManagementView = ({ data }) => {
  const getTalentManagementDatasource = () => {
    const careerMobility = {
      title: <FormattedMessage id="profile.career.mobility" />,
      description: data.careerMobility ? (
        data.careerMobility.description
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const talentMatrixResult = {
      title: <FormattedMessage id="profile.talent.matrix.result" />,
      description: data.talentMatrixResult ? (
        data.talentMatrixResult.description
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    return [careerMobility, talentMatrixResult];
  };

  return (
    <Row>
      <Col xs={24} lg={24}>
        <List
          itemLayout="horizontal"
          dataSource={getTalentManagementDatasource()}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
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
