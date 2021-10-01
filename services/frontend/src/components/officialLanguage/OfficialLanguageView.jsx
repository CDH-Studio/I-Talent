import { FormattedMessage } from "react-intl";
import { Divider, List, Typography } from "antd";
import PropTypes from "prop-types";

import "./OfficialLanguageView.less";

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
    <>
      <Title className="language-categories-title m-0" level={4}>
        <FormattedMessage id="first.official.language" />
      </Title>
      <List
        dataSource={langInfo}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item className="p-0">
            <List.Item.Meta description={item.description} />
          </List.Item>
        )}
      />
    </>
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
    <>
      <Title className="language-categories-title m-0" level={4}>
        <FormattedMessage id="second.official.language.results" />
      </Title>
      <List
        dataSource={langInfo}
        grid={{ column: langInfo.length }}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              description={
                <>
                  <Title className="language-categories-title mb-0" level={5}>
                    {item.title}
                  </Title>
                  {item.level ? (
                    <>
                      {item.level} ({item.status})
                    </>
                  ) : (
                    "-"
                  )}
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );

  return (
    <>
      {generateFirstLanguage(firstLanguageInfo)}
      <Divider className="my-3" />
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
