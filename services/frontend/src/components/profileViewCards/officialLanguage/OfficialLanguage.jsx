import { FormattedMessage, useIntl } from "react-intl";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import OfficialLanguageView from "./OfficialLanguageView";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";
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
      title: <FormattedMessage id="profile.first.language" />,
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
      nextData.titleId = `profile.secondary.${profType.toLowerCase()}.proficiency`;

      if (info) {
        if (info.level === "NA") {
          nextData.level = intl.formatMessage({ id: "grade.not.applicable" });
        } else {
          nextData.level = info.level;
          if (info.date) {
            nextData.expiryInfo = ` (${
              info.expired
                ? intl.formatMessage({ id: "profile.expired.date" })
                : intl.formatMessage({ id: "profile.expires.date" })
            } ${dayjs(info.date).format("ll")})`;
          } else if (info.expired !== false) {
            nextData.expiryInfo = `(${
              info.expired
                ? intl.formatMessage({ id: "profile.expired" })
                : intl.formatMessage({ id: "profile.unexpired" })
            })`;
          }
        }
      } else {
        nextData.level = "-";
      }

      languageInfo.push(nextData);
    });

    return languageInfo;
  };

  return (
    <ProfileCards
      titleId="profile.official.languages"
      cardName="officialLanguage"
      id="card-profile-official-language"
      editUrl="/profile/edit/language-proficiency"
      data={data}
      editableCardBool={editableCardBool}
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
