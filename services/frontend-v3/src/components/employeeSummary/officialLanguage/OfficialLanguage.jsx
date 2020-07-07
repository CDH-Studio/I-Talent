import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import OfficialLanguageView from "./OfficialLanguageView";
import { ProfileInfoPropType } from "../../../customPropTypes";

const OfficialLanguage = ({ data }) => {
  const getFirstLanguageInfo = (dataSource) => {
    let description = <FormattedMessage id="profile.not.specified" />;

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

  const getSecondLanguageGradeInfo = (dataSource) => {
    const reading = dataSource.secondLangProfs.find(
      (i) => i.proficiency === "READING"
    );

    const secondaryReadingProficiency = {
      title: <FormattedMessage id="profile.reading" />,
      description: reading ? (
        reading.level
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const writing = dataSource.secondLangProfs.find(
      (i) => i.proficiency === "WRITING"
    );

    const secondaryWritingProficiency = {
      title: <FormattedMessage id="profile.writing" />,
      description: writing ? (
        writing.level
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const oral = dataSource.secondLangProfs.find(
      (i) => i.proficiency === "ORAL"
    );

    const secondaryOralProficiency = {
      title: <FormattedMessage id="profile.oral" />,
      description: oral ? (
        oral.level
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    return [
      secondaryReadingProficiency,
      secondaryWritingProficiency,
      secondaryOralProficiency,
    ];
  };

  const getSecondLanguageDateInfo = (dataSource) => {
    const reading = dataSource.secondLangProfs.find(
      (i) => i.proficiency === "READING"
    );

    const writing = dataSource.secondLangProfs.find(
      (i) => i.proficiency === "WRITING"
    );

    const oral = dataSource.secondLangProfs.find(
      (i) => i.proficiency === "ORAL"
    );

    const secondaryReadingDate = {
      title: <FormattedMessage id="profile.reading" />,
      description:
        reading && reading.date ? (
          moment(reading.date).format("ll")
        ) : (
          <FormattedMessage id="profile.not.specified" />
        ),
    };

    const secondaryWritingDate = {
      title: <FormattedMessage id="profile.writing" />,
      description:
        writing && writing.date ? (
          moment(writing.date).format("ll")
        ) : (
          <FormattedMessage id="profile.not.specified" />
        ),
    };

    const secondaryOralDate = {
      title: <FormattedMessage id="profile.oral" />,
      description:
        oral && oral.date ? (
          moment(oral.date).format("ll")
        ) : (
          <FormattedMessage id="profile.not.specified" />
        ),
    };

    return [secondaryReadingDate, secondaryWritingDate, secondaryOralDate];
  };

  return (
    <OfficialLanguageView
      firstLanguageInfo={getFirstLanguageInfo(data)}
      secondLanguageGradeInfo={getSecondLanguageGradeInfo(data)}
      secondLanguageDateInfo={getSecondLanguageDateInfo(data)}
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
