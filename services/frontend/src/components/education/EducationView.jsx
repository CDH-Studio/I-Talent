import "./EducationView.less";

import { BankOutlined, LinkOutlined } from "@ant-design/icons";
import { Avatar, Col, Empty, List, Row, Tag } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const EducationView = ({ educationInfo }) => {
  const generateDescriptionBody = (text) => {
    if (text) {
      const lineStrings = text.split(" ").join("\u00A0").split("\n");
      return (
        <div className="bodyStyle">
          {lineStrings.map((line, index) => (
            <>
              {index > 0 ? <br /> : null} {line}
            </>
          ))}
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
                    className="experience-item-list"
                    extra={item.duration}
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
                      description={
                        <>
                          <Row>
                            <Col>
                              {generateDescriptionBody(item.description)}
                            </Col>
                          </Row>
                          {item.attachmentLinks &&
                            item.attachmentLinks.length > 0 && (
                              <Row align="middle">
                                <Col>
                                  <FormattedMessage id="attachment.links.education" />
                                  :
                                </Col>
                                <Col>{getUrl(item)}</Col>
                              </Row>
                            )}
                        </>
                      }
                      title={`${item.diploma} - (${item.school})`}
                    />
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
