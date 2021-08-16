import { List, Tag, Row, Empty, Col } from "antd";
import { FormattedMessage } from "react-intl";
import { PropTypes } from "prop-types";
import { LinkOutlined } from "@ant-design/icons";

const LearningDevelopmentView = ({ devGoals, devAttachments }) => {
  const getUrl = (item) =>
    item.map((i) => (
      <a href={i.url} rel="noopener noreferrer" target="_blank">
        <Tag key={i.id} color="#727272" style={{ cursor: "pointer" }}>
          <LinkOutlined />
          <span>{i.name.name}</span>
        </Tag>
      </a>
    ));

  const dataSource = [
    {
      title: <FormattedMessage id="developmental.goals" />,
      render: (
        <>
          {devGoals.length > 0 ? (
            <div style={{ marginTop: 7 }}>
              {Object.values(devGoals).map(({ name, id }) => (
                <Tag key={id} color="#00605e">
                  {name}
                </Tag>
              ))}
            </div>
          ) : (
            <Empty
              description={<FormattedMessage id="developmental.goals.empty" />}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <Row>
        <Col span={24}>
          <List
            dataSource={dataSource}
            itemLayout="horizontal"
            renderItem={({ title, render }) => (
              <List.Item>
                <Col span={24}>
                  <List.Item.Meta title={title} />
                  {render}
                </Col>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      {getUrl(devAttachments)}
    </>
  );
};

LearningDevelopmentView.propTypes = {
  devGoals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  devAttachments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      url: PropTypes.string,
    })
  ),
};

LearningDevelopmentView.defaultProps = {
  devGoals: [],
  devAttachments: [],
};

export default LearningDevelopmentView;
