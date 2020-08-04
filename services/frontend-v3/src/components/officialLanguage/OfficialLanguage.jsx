import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import OfficialLanguageView from "./OfficialLanguageView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const OfficialLanguage = ({ data, type, intl }) => {
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
      nextData.titleId = `profile.${profType.toLowerCase()}`;

      if (info) {
        nextData.level = info.level ? info.level : "-";
        if (info.date) {
          nextData.expiryInfo = ` (${
            info.expired
              ? intl.formatMessage({ id: "profile.expired.date" })
              : intl.formatMessage({ id: "profile.expires.date" })
          } ${moment(info.date).format("ll")})`;
        } else if (info.expired !== null) {
          nextData.expiryInfo = `(${
            info.expired
              ? intl.formatMessage({ id: "profile.expired" })
              : intl.formatMessage({ id: "profile.unexpired" })
          })`;
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
      titleId="profile.official.language"
      cardName="officialLanguage"
      content={
        <OfficialLanguageView
          firstLanguageInfo={getFirstLanguageInfo(data)}
          secondLanguageInfo={generateSecondLanguageInfo(data)}
        />
      }
      id="card-profile-official-language"
      editUrl="/secured/profile/edit/language-proficiency"
      data={data}
      type={type}
      visible={data.visibleCards.officialLanguage}
    />
  );
};

OfficialLanguage.propTypes = {
  data: ProfileInfoPropType,
};

OfficialLanguage.defaultProps = {
  data: null,
};

export default injectIntl(OfficialLanguage);
