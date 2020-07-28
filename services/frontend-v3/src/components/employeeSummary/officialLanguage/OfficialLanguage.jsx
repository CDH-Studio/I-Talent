import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import OfficialLanguageView from "./OfficialLanguageView";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";

const OfficialLanguage = ({ data }) => {
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

  const getSecondLanguageGradeInfo = (dataSource) => {
    const reading = dataSource.secondLangProfs
      ? dataSource.secondLangProfs.find((i) => i.proficiency === "READING")
      : undefined;

    const secondaryReadingProficiency = {
      title: <FormattedMessage id="profile.reading" />,
      description: reading ? reading.level : "-",
    };

    const writing = dataSource.secondLangProfs
      ? dataSource.secondLangProfs.find((i) => i.proficiency === "WRITING")
      : undefined;

    const secondaryWritingProficiency = {
      title: <FormattedMessage id="profile.writing" />,
      description: writing ? writing.level : "-",
    };

    const oral = dataSource.secondLangProfs
      ? dataSource.secondLangProfs.find((i) => i.proficiency === "ORAL")
      : undefined;

    const secondaryOralProficiency = {
      title: <FormattedMessage id="profile.oral" />,
      description: oral ? oral.level : "-",
    };

    return [
      secondaryReadingProficiency,
      secondaryWritingProficiency,
      secondaryOralProficiency,
    ];
  };

  const getSecondLanguageDateInfo = (dataSource) => {
    const reading = dataSource.secondLangProfs
      ? dataSource.secondLangProfs.find((i) => i.proficiency === "READING")
      : undefined;

    const writing = dataSource.secondLangProfs
      ? dataSource.secondLangProfs.find((i) => i.proficiency === "WRITING")
      : undefined;

    const oral = dataSource.secondLangProfs
      ? dataSource.secondLangProfs.find((i) => i.proficiency === "ORAL")
      : undefined;

    const secondaryReadingDate = {
      title: <FormattedMessage id="profile.reading" />,
      description:
        reading && reading.date ? moment(reading.date).format("ll") : "-",
    };

    const secondaryWritingDate = {
      title: <FormattedMessage id="profile.writing" />,
      description:
        writing && writing.date ? moment(writing.date).format("ll") : "-",
    };

    const secondaryOralDate = {
      title: <FormattedMessage id="profile.oral" />,
      description: oral && oral.date ? moment(oral.date).format("ll") : "-",
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
