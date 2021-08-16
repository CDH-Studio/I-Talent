import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import OfficialLanguageView from "./OfficialLanguageView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const OfficialLanguage = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const getFirstLanguageInfo = (dataSource) => {
    let description = "-";

    if (dataSource.firstLanguage === "ENGLISH") {
      description = <FormattedMessage id="language.english" />;
    } else if (dataSource.firstLanguage === "FRENCH") {
      description = <FormattedMessage id="language.french" />;
    }

    const firstLanguage = {
      title: <FormattedMessage id="first.official.language" />,
      description,
    };
    return [firstLanguage];
  };

  const generateSecondLanguageInfo = (dataSource) => {
    const languageInfo = [];

    ["READING", "WRITING", "ORAL"].forEach((profType) => {
      const nextData = {};

      const info = dataSource.secondLangProfs
        ? dataSource.secondLangProfs.find((i) => i.proficiency === profType)
        : undefined;

      nextData.titleId = `secondary.${profType.toLowerCase()}.proficiency`;

      if (info) {
        if (info.status === "NA") {
          nextData.status = intl.formatMessage({ id: "grade.not.applicable" });
        } else {
          nextData.status = intl.formatMessage({
            id: info.status.toLowerCase(),
          });
        }

        if (info.level === "NA") {
          nextData.level = intl.formatMessage({ id: "grade.not.applicable" });
        } else {
          nextData.level = info.level;
        }
      }

      languageInfo.push(nextData);
    });

    return languageInfo;
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
      <OfficialLanguageView
        firstLanguageInfo={getFirstLanguageInfo(data)}
        secondLanguageInfo={generateSecondLanguageInfo(data)}
      />
    </ProfileCards>
  );
};

OfficialLanguage.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

OfficialLanguage.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default OfficialLanguage;
