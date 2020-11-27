import PropTypes from "prop-types";
import { Row, Col, List } from "antd";
import { FormattedMessage } from "react-intl";

const OfficialLanguageView = ({ firstLanguageInfo, secondLanguageInfo }) => {
  const generateFirstLanguage = (dataSource) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  };

  const generateSecondLanguageData = () => {
    return (
      <List
        grid={{ column: 3 }}
        dataSource={secondLanguageInfo}
        renderItem={(i) => (
          <List.Item>
            <List.Item.Meta
              title={<FormattedMessage id={i.titleId} />}
              description={
                <>
                  {i.level} {i.expiryInfo}
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <>
      <Row>
        <Col xs={24} lg={12}>
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
      expiryInfo: PropTypes.string,
    })
  ).isRequired,
};

export default OfficialLanguageView;
