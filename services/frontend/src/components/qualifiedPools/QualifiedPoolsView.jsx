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
      className="qualifiedPoolsList"
      dataSource={qualifiedPoolsInfo}
      itemLayout="horizontal"
      renderItem={(item, index) => (
        <List.Item className="px-0">
          <Row className="w-100">
            <Col className="mb-0" span={24}>
              <Title className="mb-1 d-block" level={4}>
                <ScheduleOutlined aria-hidden="true" className="mr-1" />
                <FormattedMessage id="qualified.pools" /> {index + 1}:
              </Title>
            </Col>
            <Col className="mb-1" xl={6} xs={24}>
              <Title className="ll mb-0" level={5}>
                <FormattedMessage id="classification" />
              </Title>
              {item.classification}
            </Col>
            <Col className="mb-1" xl={6} xs={24}>
              <Title className="mb-0" level={5}>
                <FormattedMessage id="job.title.department" />
              </Title>
              {item.jobTitle}
            </Col>

            {item.selectionProcessNumber && (
              <Col className="mb-1" xl={6} xs={24}>
                <Title className="mb-0" level={5}>
                  <FormattedMessage id="qualified.pools.selection.process.number" />
                </Title>
                {item.selectionProcessNumber}
              </Col>
            )}

            <Col className="mb-1" xl={6} xs={24}>
              <Title className="mb-0" level={5}>
                <FormattedMessage id="qualified.pools.job.poster.link" />
              </Title>
              <Link href={item.jobPosterLink} target="_blank">
                <Tag
                  className="mx-0"
                  color="#727272"
                  style={{ cursor: "pointer" }}
                >
                  <LinkOutlined aria-hidden="true" className="mx-1" />
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
