import React from "react";
import { FormattedMessage } from "react-intl";
import { CheckOutlined } from '@ant-design/icons';
import { Row, Col, List } from "antd";

function TalentManagementView(props) {
  const styles = {
    exFeederTitleSpan:{
      paddingLeft:"8px"
    }
  }

  const getTalentManagementDatasource = data => {
    const locale = localStorage.getItem("lang");
    const careerMobility = {
      title: <FormattedMessage id="profile.career.mobility" />,
      description: data.careerMobility.description[locale] || (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    const talentMatrixResult = {
      title: <FormattedMessage id="profile.talent.matrix.result" />,
      description: data.talentMatrixResult.description[locale] || (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    if (data.exFeeder == true){
      const exFeederResult = {
        title: <React.Fragment><CheckOutlined/><span style={styles.exFeederTitleSpan}><FormattedMessage id="profile.ex.feeder" /></span></React.Fragment>
      }
      return [careerMobility, talentMatrixResult, exFeederResult];
    } else {
      return [careerMobility, talentMatrixResult];
    }
  };
  
  const generateTalentManagementInfoList = dataSource => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  };

  return (
    <Row>
      <Col xs={24} lg={24}>
        {generateTalentManagementInfoList(
          getTalentManagementDatasource(props.data)
        )}
      </Col>
    </Row>
  );
}

export default TalentManagementView;
