import { FormattedMessage } from "react-intl";
import { ScheduleOutlined } from "@ant-design/icons";
import { Col, Empty, List, Row, Typography } from "antd";
import PropTypes from "prop-types";

import TagList from "../../tagList/TagList";

import "./QualifiedPoolsView.less";

const { Title } = Typography;

const QualifiedPoolsView = ({ qualifiedPoolsInfo }) =>
  qualifiedPoolsInfo && qualifiedPoolsInfo.length > 0 ? (
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
              <TagList data={item.jobPosterLink} tagStyle="link" />
            </Col>
          </Row>
        </List.Item>
      )}
      size="small"
    />
  ) : (
    <Empty
      description={<FormattedMessage id="qualified.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );

QualifiedPoolsView.propTypes = {
  qualifiedPoolsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      classification: PropTypes.string,
      jobPosterLink: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string,
          icon: PropTypes.node,
          key: PropTypes.string,
          label: PropTypes.string,
        })
      ),
      jobTitle: PropTypes.string,
      selectionProcessNumber: PropTypes.string,
    })
  ).isRequired,
};

export default QualifiedPoolsView;
