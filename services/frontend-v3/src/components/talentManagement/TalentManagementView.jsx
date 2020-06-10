import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Row, Col, List } from "antd";
import { ProfileInfoPropType } from "../../customPropTypes";

const TalentManagementView = ({ locale, data }) => {
  const getTalentManagementDatasource = () => {
    const careerMobility = {
      title: <FormattedMessage id="profile.career.mobility" />,
      description: data.careerMobility.description[locale] || (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const talentMatrixResult = {
      title: <FormattedMessage id="profile.talent.matrix.result" />,
      description: data.talentMatrixResult.description[locale] || (
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
  locale: PropTypes.oneOf(["fr", "en"]).isRequired,
};

TalentManagementView.defaultProps = {
  data: null,
};

export default TalentManagementView;
