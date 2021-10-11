import { FormattedMessage } from "react-intl";
import { LinkOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Col, Empty, List, Row, Tag, Typography } from "antd";
import PropTypes from "prop-types";

import "./QualifiedPoolsView.less";

const { Link, Title } = Typography;

const QualifiedPoolsView = ({ qualifiedPoolsInfo }) => {
  if (qualifiedPoolsInfo.length === 0) {
    return (
      <Empty
        description={<FormattedMessage id="qualified.empty" />}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
  return (
    <List
      dataSource={qualifiedPoolsInfo}
      itemLayout="horizontal"
      renderItem={(item, index) => (
        <List.Item>
          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Title className="d-block" level={4}>
                <ScheduleOutlined aria-hidden="true" className="mr-1" />
                <FormattedMessage id="qualified.pools" /> {index + 1}:
              </Title>
            </Col>
            <Col span={6}>
              <Title level={5}>
                <FormattedMessage id="classification" />
              </Title>
              {item.classification}
            </Col>
            <Col span={6}>
              <Title level={5}>
                <FormattedMessage id="job.title.department" />
              </Title>
              {item.jobTitle}
            </Col>

            {item.selectionProcessNumber && (
              <Col span={6}>
                <Title level={5}>
                  <FormattedMessage id="classification" />
                </Title>
                {item.selectionProcessNumber}
              </Col>
            )}

            <Col span={6}>
              <Title level={5}>
                <FormattedMessage id="qualified.pools.job.poster.link" />
              </Title>
              <Link href={item.jobPosterLink} target="_blank">
                <Tag color="#727272" style={{ cursor: "pointer" }}>
                  <LinkOutlined aria-hidden="true" className="mr-1" />
                  Job poster
                  <span className="screenReaderOnly">
                    <FormattedMessage id="opens.in.new.tab" />
                  </span>
                </Tag>
              </Link>
            </Col>
          </Row>
        </List.Item>
      )}
      size="small"
    />
  );
};

QualifiedPoolsView.propTypes = {
  qualifiedPoolsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      classification: PropTypes.string,
    })
  ).isRequired,
};

export default QualifiedPoolsView;
