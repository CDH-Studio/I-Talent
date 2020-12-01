import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { List, Empty, Descriptions, Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import "./QualifiedPoolsView.less";

const { Link, Text } = Typography;

const QualifiedPoolsView = ({ qualifiedPoolsInfo }) => {
  if (qualifiedPoolsInfo.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<FormattedMessage id="qualified.empty" />}
      />
    );
  }
  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={qualifiedPoolsInfo}
      renderItem={(item) => (
        <List.Item>
          <Descriptions
            size="small"
            column={{ xs: 1, sm: 2, md: 3, xl: 4, xxl: 6 }}
          >
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
                  <FormattedMessage id="job.title" />
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
