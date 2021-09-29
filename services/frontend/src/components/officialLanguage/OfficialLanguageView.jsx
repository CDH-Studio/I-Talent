import { FormattedMessage } from "react-intl";
import { Divider, List, Typography } from "antd";
import PropTypes from "prop-types";

const { Title } = Typography;

const OfficialLanguageView = ({ firstLanguageInfo, secondLanguageInfo }) => {
  /**
   * Generate First Official Language info list
   * @param {Object[]} langInfo - object describing the language category
   * @param {string} langInfo[].level - level of lang proficiency
   * @param {string} langInfo[].status - status of lang proficiency
   * @param {string} langInfo[].title - translated title of language category
   * @returns {HTMLElement} - HTML markup for second lang list
   */
  const generateFirstLanguage = (langInfo) => (
    <List
      dataSource={langInfo}
      itemLayout="horizontal"
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta description={item.description} title={item.title} />
        </List.Item>
      )}
    />
  );

  /**
   * Generate Second Official Language info list
   * @param {Object[]} langInfo - object describing the dropdown options
   * @param {string} langInfo[].level - level of lang proficiency
   * @param {string} langInfo[].status - status of lang proficiency
   * @param {string} langInfo[].title - translated title of language category
   * @returns {HTMLElement} - HTML markup for second lang list
   */
  const generateSecondLanguageData = (langInfo) => (
    <List
      dataSource={langInfo}
      grid={{ column: langInfo.length }}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            description={
              item.level ? (
                <>
                  {item.level} ({item.status})
                </>
              ) : (
                "-"
              )
            }
            title={item.title}
          />
        </List.Item>
      )}
    />
  );

  return (
    <>
      {generateFirstLanguage(firstLanguageInfo)}
      <Divider className="mt-0 mb-3" />
      <Title level={5}>
        <FormattedMessage id="second.official.language.results" />
      </Title>
      {generateSecondLanguageData(secondLanguageInfo)}
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
