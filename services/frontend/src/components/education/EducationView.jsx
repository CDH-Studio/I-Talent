import { FormattedMessage } from "react-intl";
import { BankOutlined, LinkOutlined } from "@ant-design/icons";
import { Avatar, Col, Empty, List, Row, Tag } from "antd";
import PropTypes from "prop-types";

import "./EducationView.less";

const EducationView = ({ educationInfo }) => {
  const generateDescriptionBody = (text) => {
    if (text) {
      return (
        <div className="education-descriptionViewText">
          <h5 className="visually-hidden">
            <FormattedMessage id="description" />
          </h5>
          <div>{text}</div>
        </div>
      );
    }
    return undefined;
  };

  const getUrl = (item) => {
    if (item.attachmentLinks && item.attachmentLinks.length > 0)
      return item.attachmentLinks.map((i) => (
        <a href={i.url} rel="noopener noreferrer" target="_blank">
          <Tag key={i.id} color="#727272" style={{ cursor: "pointer" }}>
            <LinkOutlined />
            <span>{i.name}</span>
          </Tag>
        </a>
      ));
    return undefined;
  };

  if (educationInfo.length > 0) {
    return (
      <Row>
        <Col lg={24} xs={24}>
          <Row>
            <Col lg={24} xs={24}>
              <List
                dataSource={educationInfo}
                itemLayout="vertical"
                renderItem={(item) => (
                  <List.Item
                    className="qualification-item-list"
                    extra={
                      <>
                        <h5 className="visually-hidden">Duration</h5>
                        {item.duration}
                      </>
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          className="avatar"
                          icon={<BankOutlined />}
                          shape="square"
                          size="large"
                        />
                      }
                      description={item.school}
                      title={item.diploma}
                    />
                    <>
                      {item.description &&
                        generateDescriptionBody(item.description)}

                      {item.attachmentLinks && item.attachmentLinks.length > 0 && (
                        <Row align="middle">
                          <Col>
                            <h5 className="visually-hidden">
                              <FormattedMessage id="attachment.links.education" />
                            </h5>
                            {getUrl(item)}
                          </Col>
                        </Row>
                      )}
                    </>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
  return (
    <Empty
      description={<FormattedMessage id="education.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

EducationView.propTypes = {
  educationInfo: PropTypes.arrayOf(
    PropTypes.shape({
      diploma: PropTypes.string,
      duration: PropTypes.string,
      school: PropTypes.string,
    })
  ).isRequired,
};

export default EducationView;
