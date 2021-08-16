import { Col, List, Row } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const OfficialLanguageView = ({ firstLanguageInfo, secondLanguageInfo }) => {
  const generateFirstLanguage = (dataSource) => (
    <List
      dataSource={dataSource}
      itemLayout="horizontal"
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta description={item.description} title={item.title} />
        </List.Item>
      )}
    />
  );

  const generateSecondLanguageData = () => (
    <List
      dataSource={secondLanguageInfo}
      grid={{ column: 3 }}
      renderItem={(i) => (
        <List.Item>
          <List.Item.Meta
            description={
              i.level ? (
                <>
                  {i.level} ({i.status})
                </>
              ) : (
                "-"
              )
            }
            title={<FormattedMessage id={i.titleId} />}
          />
        </List.Item>
      )}
    />
  );

  return (
    <>
      <Row>
        <Col lg={12} xs={24}>
          {generateFirstLanguage(firstLanguageInfo)}
        </Col>
      </Row>
      {generateSecondLanguageData()}
    </>
  );
};

OfficialLanguageView.propTypes = {
  firstLanguageInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      description: PropTypes.node,
    })
  ).isRequired,
  secondLanguageInfo: PropTypes.arrayOf(
    PropTypes.shape({
      titleId: PropTypes.string,
      level: PropTypes.string,
      status: PropTypes.string,
    })
  ).isRequired,
};

export default OfficialLanguageView;
