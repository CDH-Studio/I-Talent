import { Row, Col, Avatar, List, Empty, Tag } from "antd";
import { BankOutlined, LinkOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import "./EducationView.less";

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
        <a target="_blank" rel="noopener noreferrer" href={i.url}>
          <Tag color="#727272" key={i.id} style={{ cursor: "pointer" }}>
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
        <Col xs={24} lg={24}>
          <Row>
            <Col xs={24} lg={24}>
              <List
                itemLayout="vertical"
                dataSource={educationInfo}
                renderItem={(item) => (
                  <List.Item
                    className="experience-item-list"
                    extra={item.duration}
                  >
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
                                  <FormattedMessage id="attachment.links" />:
                                </Col>
                                <Col>{getUrl(item)}</Col>
                              </Row>
                            )}
                        </>
                      }
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
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="education.empty" />}
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
