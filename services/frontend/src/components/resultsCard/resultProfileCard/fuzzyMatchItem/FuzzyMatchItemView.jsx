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
        return <FormattedMessage id="profile.first.name" />;
      case "lastName":
        return <FormattedMessage id="profile.last.name" />;
      case "email":
        return <FormattedMessage id="profile.email" />;
      case "officeLocation":
        return <FormattedMessage id="profile.location" />;
      case "manager":
        return <FormattedMessage id="profile.manager" />;
      case "branch":
        return <FormattedMessage id="profile.branch" />;
      case "organizations":
        return <FormattedMessage id="profile.org.tree" />;
      case "experiences":
        return <FormattedMessage id="profile.experience" />;
      case "competencies":
        return <FormattedMessage id="profile.competencies" />;
      case "skills":
        return <FormattedMessage id="profile.skills" />;
      case "teams":
        return <FormattedMessage id="profile.teams" />;
      case "groupLevel":
        return <FormattedMessage id="profile.classification" />;
      case "tenure":
        return <FormattedMessage id="profile.substantive" />;
      case "jobTitle":
        return <FormattedMessage id="profile.career.header.name" />;
      case "fullName":
        return <FormattedMessage id="advanced.search.form.name" />;
      default:
        return itemName;
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
