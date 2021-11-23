import { FormattedMessage } from "react-intl";
import { Typography } from "antd";
import { indexOf } from "lodash";
import PropTypes from "prop-types";

const { Text } = Typography;

/**
 * Only grab string up to first "."
 * @param {string} itemName - string to clean
 * @returns {string} - cleaned up string
 */
const cleanItemNameString = ({ itemName }) => {
  const locationOfChar = indexOf(itemName, ".");
  if (locationOfChar > 0) {
    return itemName.slice(0, locationOfChar);
  }
  return itemName;
};

/**
 * Find translated result name based on key
 * @param {string} itemName - item key used to identify it
 * @returns {React.ReactElement} - React Element
 */
/* eslint-disable react/prop-types */
const MatchTranslatedName = ({ itemName }) => {
  const cleanString = cleanItemNameString({ itemName });
  switch (cleanString) {
    case "firstName":
      return <FormattedMessage id="first.name" />;
    case "lastName":
      return <FormattedMessage id="last.name" />;
    case "email":
      return <FormattedMessage id="email" />;
    case "officeLocation":
      return <FormattedMessage id="working.address" />;
    case "manager":
      return <FormattedMessage id="employee.manager" />;
    case "branch":
      return <FormattedMessage id="branch" />;
    case "organizations":
      return <FormattedMessage id="profile.org.tree" />;
    case "experiences":
      return <FormattedMessage id="experience" />;
    case "competencies":
      return <FormattedMessage id="competencies" />;
    case "skills":
      return <FormattedMessage id="skills" />;
    case "teams":
      return <FormattedMessage id="team" />;
    case "groupLevel":
      return <FormattedMessage id="classification" />;
    case "tenure":
      return <FormattedMessage id="profile.substantive" />;
    case "jobTitle":
      return <FormattedMessage id="job.title" />;
    case "fullName":
      return <FormattedMessage id="name" />;
    case "exFeederText":
      return <FormattedMessage id="ex.feeder" />;
    case "educations":
      return <FormattedMessage id="education" />;
    case "qualifiedPools":
      return <FormattedMessage id="qualified.pools" />;
    default:
      return <FormattedMessage id={itemName} />;
  }
};
/* eslint-enable react/prop-types */

const FuzzyMatchItemView = ({ matchItemName, matchItemString }) => (
  <div style={{ textAlign: "left" }}>
    <Text strong>
      <MatchTranslatedName itemName={matchItemName} />:{" "}
    </Text>
    <Text>{matchItemString}</Text>
  </div>
);

FuzzyMatchItemView.propTypes = {
  matchItemName: PropTypes.string.isRequired,
  matchItemString: PropTypes.string.isRequired,
};

export default FuzzyMatchItemView;
