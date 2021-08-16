import { FormattedMessage } from "react-intl";
import { LinkOutlined } from "@ant-design/icons";
import { Descriptions, Empty, List, Typography } from "antd";
import PropTypes from "prop-types";

import "./QualifiedPoolsView.less";

const { Link, Text } = Typography;

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
      renderItem={(item) => (
        <List.Item>
          <Descriptions column={{ sm: 2, xs: 1, xxl: 3 }} size="small">
            <Descriptions.Item
              label={
                <Text strong>
                  <FormattedMessage id="classification" />
                </Text>
              }
            >
              {item.classification}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Text strong>
                  <FormattedMessage id="job.title.department" />
                </Text>
              }
            >
              {item.jobTitle}
            </Descriptions.Item>
            <Descriptions.Item className="qualificationPools-Link">
              <Link href={item.jobPosterLink} target="_blank">
                <LinkOutlined />
                {item.selectionProcessNumber}
              </Link>
            </Descriptions.Item>
          </Descriptions>
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
