import { FormattedMessage } from "react-intl";
import { Divider, List, Typography } from "antd";
import PropTypes from "prop-types";

import "./OfficialLanguageCardView.less";

const { Title, Text } = Typography;

/**
 * Generate First Official Language info list
 * @param {Object} prop - component props
 * @param {Object[]} langInfo - object describing the language category
 * @param {string} langInfo[].description - the saved language
 * @returns {React.ReactElement} - React Element for second lang list
 */
/* eslint-disable react/prop-types */
const FirstLanguageInfo = ({ langInfo }) => (
  <>
    <Title className="language-categories-title m-0" level={4}>
      <FormattedMessage id="first.official.language" />
    </Title>
    <Text type="secondary">{langInfo.description}</Text>
  </>
);
/* eslint-enable react/prop-types */

/**
 * Generate Second Official Language info list
 * @param {Object} prop - component props
 * @param {Object[]} langInfo - object describing the dropdown options
 * @param {string} langInfo[].level - level of lang proficiency
 * @param {string} langInfo[].status - status of lang proficiency
 * @param {string} langInfo[].title - translated title of language category
 * @returns {React.ReactElement} - React Element for second lang list
 */
/* eslint-disable react/prop-types */
const SecondLanguageInfo = ({ langInfo }) => (
  <>
    <Title className="language-categories-title m-0" level={4}>
      <FormattedMessage id="second.official.language.results" />
    </Title>
    <List
      dataSource={langInfo}
      grid={{ column: langInfo.length }}
      renderItem={(item) => (
        <List.Item className="mb-1">
          <Title className="language-categories-title mb-0" level={5}>
            {item.title}
          </Title>
          {item.level ? (
            <Text type="secondary">
              {item.level} ({item.status})
            </Text>
          ) : (
            <FormattedMessage id="not.provided" />
          )}
        </List.Item>
      )}
    />
  </>
);
/* eslint-enable react/prop-types */

const OfficialLanguageCardView = ({
  firstLanguageInfo,
  secondLanguageInfo,
}) => (
  <>
    {firstLanguageInfo && <FirstLanguageInfo langInfo={firstLanguageInfo} />}
    {secondLanguageInfo && secondLanguageInfo.length > 0 && (
      <>
        <Divider className="my-2" />
        <SecondLanguageInfo langInfo={secondLanguageInfo} />
      </>
    )}
  </>
);

OfficialLanguageCardView.propTypes = {
  firstLanguageInfo: PropTypes.shape({
    description: PropTypes.node,
    title: PropTypes.node,
  }).isRequired,
  secondLanguageInfo: PropTypes.arrayOf(
    PropTypes.shape({
      level: PropTypes.string,
      status: PropTypes.string,
      titleId: PropTypes.string,
    })
  ).isRequired,
};

export default OfficialLanguageCardView;
