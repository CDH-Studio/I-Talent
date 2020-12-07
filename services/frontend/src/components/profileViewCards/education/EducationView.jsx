import { Row, Col, Avatar, List, Empty, Tag, Descriptions } from "antd";
import { BankOutlined, LinkOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import "./EducationView.less";

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
        <Col>
          <Descriptions.Item>{item.description}</Descriptions.Item>
        </Col>
      </Row>
      {item.attachmentLinks && item.attachmentLinks.length > 0 && (
        <Row align="middle">
          <Col>
            <FormattedMessage id="setup.attachment" />:
          </Col>
          <Col>{getUrl(item)}</Col>
        </Row>
      )}
    </>
  );

  const generateEducationInfoList = (dataSource) => {
    return (
      <Row>
        <Col xs={24} lg={24}>
          <List
            itemLayout="vertical"
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item className="experience-item-list" extra={item.duration}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className="avatar"
                      size="large"
                      icon={<BankOutlined />}
                      shape="square"
                    />
                  }
                  title={`${item.diploma} - (${item.school})`}
                  description={generateEducationItemDescription(item)}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
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
