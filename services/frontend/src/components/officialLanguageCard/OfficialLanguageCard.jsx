import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import OfficialLanguageCardView from "./OfficialLanguageCardView";

const OfficialLanguageCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  /**
   * Generate First Official Language info array
   * @param {object[]} dataSource - object describing the userprofile
   * @param {string} dataSource[].firstLanguage - user's first official language
   * @return {{description: string, title: string}} - array of first language results
   */
  const getFirstLanguageInfo = (dataSource) => {
    let description = <FormattedMessage id="not.provided" />;

    if (dataSource.firstLanguage === "ENGLISH") {
      description = <FormattedMessage id="language.english" />;
    } else if (dataSource.firstLanguage === "FRENCH") {
      description = <FormattedMessage id="language.french" />;
    }

    const firstLanguage = {
      description,
      title: <FormattedMessage id="first.official.language" />,
    };
    return firstLanguage;
  };

  /**
   * Generate Second Official Language Proficiency Title
   * @param {string} proficiencyLevel - proficiency title from data source
   * @returns {string} - formatted proficiency title
   */
  const generateSecondLangProficiencyTitle = (proficiencyType) => {
    const i18nID = `secondary.${proficiencyType.toLowerCase()}.proficiency`;
    return intl.formatMessage({
      id: i18nID,
    });
  };

  /**
   * Generate Second Official Language Proficiency Status
   * @param {string} proficiencyLevel - proficiency status from data source
   * @returns {string} - formatted proficiency status
   */
  const generateSecondLangProficiencyStatus = (proficiencyStatus) => {
    let translatedStatus = "";
    if (proficiencyStatus) {
      if (proficiencyStatus === "NA") {
        translatedStatus = intl.formatMessage({
          id: "grade.not.applicable",
        });
      } else {
        translatedStatus = intl.formatMessage({
          id: proficiencyStatus.toLowerCase(),
        });
      }
    }
    return translatedStatus;
  };

  /**
   * Generate Second Official Language Proficiency Level
   * @param {string} proficiencyLevel - proficiency level from data source
   * @returns {string} - formatted proficiency level
   */
  const generateSecondLangProficiencyLevel = (proficiencyLevel) => {
    let translatedLevel = "";
    if (proficiencyLevel) {
      if (proficiencyLevel === "NA") {
        translatedLevel = intl.formatMessage({ id: "grade.not.applicable" });
      } else {
        translatedLevel = proficiencyLevel;
      }
    }
    return translatedLevel;
  };

  /**
   * Generate Second Official Language info array
   * @param {object[]} dataSource - object describing the user profile
   * @param {string} dataSource[].firstLanguage - user's first official language
   * @returns {Array.<{title: string, level: string, status: string}>} - array of second language results
   */
  const generateSecondLanguageInfo = (dataSource) => {
    const formattedLanguageInfo = [];

    if (dataSource.secondLangProfs) {
      dataSource.secondLangProfs.forEach((item) => {
        const formattedLangProficiencyItem = {};

        formattedLangProficiencyItem.title = generateSecondLangProficiencyTitle(
          item.proficiency
        );
        formattedLangProficiencyItem.level = generateSecondLangProficiencyLevel(
          item.level
        );
        formattedLangProficiencyItem.status =
          generateSecondLangProficiencyStatus(item.status);

        formattedLanguageInfo.push(formattedLangProficiencyItem);
      });
    }

    return formattedLanguageInfo;
  };

  return (
    <ProfileCards
      cardName="officialLanguage"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/language-proficiency"
      id="card-profile-official-language"
      titleString={intl.formatMessage({ id: "official.languages" })}
      visibility={data.visibleCards.officialLanguage}
    >
      <OfficialLanguageCardView
        firstLanguageInfo={getFirstLanguageInfo(data)}
        secondLanguageInfo={generateSecondLanguageInfo(data)}
      />
    </ProfileCards>
  );
};

OfficialLanguageCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

OfficialLanguageCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default OfficialLanguageCard;
