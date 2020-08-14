import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import moment from "moment";
import PropTypes from "prop-types";

import OfficialLanguageView from "./OfficialLanguageView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const OfficialLanguage = ({ data, type }) => {
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
        nextData.level =
          info.level === "NA"
            ? intl.formatMessage({ id: "grade.not.applicable" })
            : info.level;

        if (info.date) {
          nextData.expiryInfo = ` (${
            info.expired
              ? intl.formatMessage({ id: "profile.expired.date" })
              : intl.formatMessage({ id: "profile.expires.date" })
          } ${moment(info.date).format("ll")})`;
        } else if (!info.expired) {
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
      editUrl="/profile/edit/language-proficiency"
      data={data}
      type={type}
      visible={data.visibleCards.officialLanguage}
    />
  );
};

OfficialLanguage.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

OfficialLanguage.defaultProps = {
  data: null,
  type: null,
};

export default OfficialLanguage;
