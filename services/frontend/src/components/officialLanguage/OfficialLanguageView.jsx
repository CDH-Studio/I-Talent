import { FormattedMessage } from "react-intl";
import { Col, Divider, List, Row, Typography } from "antd";
import PropTypes from "prop-types";

const { Title } = Typography;

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
      <Divider />
      <Title level={5}>
        <FormattedMessage id="second.official.language.results" />
      </Title>
      {generateSecondLanguageData()}
    </>
  );
};

OfficialLanguageView.propTypes = {
  firstLanguageInfo: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.node,
      title: PropTypes.node,
    })
  ).isRequired,
  secondLanguageInfo: PropTypes.arrayOf(
    PropTypes.shape({
      level: PropTypes.string,
      status: PropTypes.string,
      titleId: PropTypes.string,
    })
  ).isRequired,
};

export default OfficialLanguageView;
