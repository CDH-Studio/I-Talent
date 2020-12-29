import { List, Tag, Row, Empty, Col } from "antd";
import { FormattedMessage } from "react-intl";
import { PropTypes } from "prop-types";
import { LinkOutlined } from "@ant-design/icons";

const LearningDevelopmentView = ({ devGoals, devAttachments }) => {
  const getUrl = (item) =>
    item.map((i) => (
      <a target="_blank" rel="noopener noreferrer" href={i.url}>
        <Tag color="#727272" key={i.id} style={{ cursor: "pointer" }}>
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
                <Tag color="#00605e" key={id}>
                  {name}
                </Tag>
              ))}
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<FormattedMessage id="developmental.goals.empty" />}
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
            itemLayout="horizontal"
            dataSource={dataSource}
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
