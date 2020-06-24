import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { useSelector } from "react-redux";
import OfficialLanguageView from "./OfficialLanguageView";
import { ProfileInfoPropType } from "../../customPropTypes";

const OfficialLanguage = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const getFirstLanguageInfo = (dataSource) => {
    const firstLanguage = {
      title: <FormattedMessage id="profile.first.language" />,
      description:
        dataSource.firstLanguage === undefined ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          dataSource.firstLanguage[locale]
        ),
    };
    return firstLanguage;
  };

  const getSecondLanguageInfo = (dataSource) => {
    const secondaryReadingProficiency = {
      title: <FormattedMessage id="profile.reading" />,
      grade:
        dataSource.secondaryReadingProficiency === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          dataSource.secondaryReadingProficiency
        ),
      date:
        dataSource.secondaryReadingDate === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          moment(dataSource.secondaryReadingDate).format("ll")
        ),
    };

    const secondaryWritingProficiency = {
      title: <FormattedMessage id="profile.writing" />,
      grade:
        dataSource.secondaryWritingProficiency === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          dataSource.secondaryWritingProficiency
        ),
      date:
        dataSource.secondaryWritingDate === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          moment(dataSource.secondaryWritingDate).format("ll")
        ),
    };

    const secondaryOralProficiency = {
      title: <FormattedMessage id="profile.oral" />,
      grade:
        dataSource.secondaryOralProficiency === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          dataSource.secondaryOralProficiency
        ),
      date:
        dataSource.secondaryOralDate === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          moment(dataSource.secondaryOralDate).format("ll")
        ),
    };

    return [
      secondaryReadingProficiency,
      secondaryWritingProficiency,
      secondaryOralProficiency,
    ];
  };

  return (
    <OfficialLanguageView
      firstLanguageInfo={getFirstLanguageInfo(data)}
      secondLanguageInfo={getSecondLanguageInfo(data)}
    />
  );
};

OfficialLanguage.propTypes = {
  data: ProfileInfoPropType,
};

OfficialLanguage.defaultProps = {
  data: null,
};
export default OfficialLanguage;
