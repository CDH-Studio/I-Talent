import { Row, Col, Avatar, List, Empty, Tag } from "antd";
import { BankOutlined, LinkOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import "./EducationView.less";
import DescriptionText from "../descriptionText/DescriptionText";

const EducationView = ({ educationInfo }) => {
  const getUrl = (item) => {
    if (item.attachmentLinks && item.attachmentLinks.length > 0)
      return item.attachmentLinks.map((i) => (
        <a target="_blank" rel="noopener noreferrer" href={i.url}>
          <Tag color="#727272" key={i.id} style={{ cursor: "pointer" }}>
            <LinkOutlined />
            <span>{i.name}</span>
          </Tag>
        </a>
      ));
    return undefined;
  };

  const generateEducationItemDescription = (item) => (
    <>
      <Row>
        <Col>{item.school}</Col>
      </Row>
      <Row>
        <Col>
          <DescriptionText text={item.description} expandable />
        </Col>
      </Row>
      {getUrl(item)}
    </>
  );

  const generateEducationInfoList = (dataSource) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item extra={item.duration}>
            <List.Item.Meta
              avatar={
                <Avatar
                  className="avatar"
                  size="large"
                  icon={<BankOutlined />}
                  shape="square"
                />
              }
              title={item.diploma}
              description={generateEducationItemDescription(item)}
            />
          </List.Item>
        )}
      />
    );
  };

  if (educationInfo.length > 0) {
    return (
      <Row>
        <Col xs={24} lg={24}>
          {generateEducationInfoList(educationInfo)}
        </Col>
      </Row>
    );
  }
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="profile.education.empty" />}
    />
  );
};

EducationView.propTypes = {
  educationInfo: PropTypes.arrayOf(
    PropTypes.shape({
      diploma: PropTypes.string,
      school: PropTypes.string,
      duration: PropTypes.string,
    })
  ).isRequired,
};

export default EducationView;
