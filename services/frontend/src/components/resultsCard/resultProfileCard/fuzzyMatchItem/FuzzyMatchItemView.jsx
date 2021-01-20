import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Typography } from "antd";
import { indexOf } from "lodash";

const { Text } = Typography;

const FuzzyMatchItemView = ({ matchItemName, matchItemString }) => {
  /**
   * Only grab string up to first "."
   * @param {itemName} string - string to clean
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
   * @param {itemName} string - item key used to identify it
   */
  const getMatchTranslatedName = ({ itemName }) => {
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
      default:
        return <FormattedMessage id={itemName} />;
    }
  };

  return (
    <div style={{ textAlign: "left" }}>
      <Text strong>
        {getMatchTranslatedName({ itemName: matchItemName })}:{" "}
      </Text>
      <Text>{matchItemString}</Text>
    </div>
  );
};

FuzzyMatchItemView.propTypes = {
  matchItemName: PropTypes.string.isRequired,
  matchItemString: PropTypes.string.isRequired,
};

export default FuzzyMatchItemView;
