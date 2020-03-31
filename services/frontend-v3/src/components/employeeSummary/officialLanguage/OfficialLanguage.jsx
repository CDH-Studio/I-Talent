import React, { Component } from "react";
import OfficialLanguageView from "./OfficialLanguageView";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

function OfficialLanguage(props) {
  const data = props.data;

  const getFirstLanguageInfo = dataSource => {
    const locale = localStorage.getItem("lang");

    const firstLanguage = {
      title: <FormattedMessage id="profile.first.language" />,
      description:
        dataSource.firstLanguage === undefined ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          dataSource.firstLanguage[locale]
        )
    };
    return [firstLanguage];
  };

  const getSecondLanguageGradeInfo = dataSource => {
    const secondaryReadingProficiency = {
      title: <FormattedMessage id="profile.reading" />,
      description:
        dataSource.secondaryReadingProficiency === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          dataSource.secondaryReadingProficiency
        )
    };

    const secondaryWritingProficiency = {
      title: <FormattedMessage id="profile.writing" />,
      description:
        dataSource.secondaryWritingProficiency === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          dataSource.secondaryWritingProficiency
        )
    };

    const secondaryOralProficiency = {
      title: <FormattedMessage id="profile.oral" />,
      description:
        dataSource.secondaryOralProficiency === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          dataSource.secondaryOralProficiency
        )
    };

    return [
      secondaryReadingProficiency,
      secondaryWritingProficiency,
      secondaryOralProficiency
    ];
  };

  const getSecondLanguageDateInfo = dataSource => {
    const formatedReadingDate = moment(dataSource.secondaryReadingDate).format(
      "ll"
    );
    const formatedWritingDate = moment(dataSource.secondaryWritingDate).format(
      "ll"
    );
    const formatedOralDate = moment(dataSource.secondaryOralDate).format("ll");

    const secondaryReadingDate = {
      title: <FormattedMessage id="profile.reading" />,
      description:
        dataSource.secondaryReadingDate === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          formatedReadingDate
        )
    };

    const secondaryWritingDate = {
      title: <FormattedMessage id="profile.writing" />,
      description:
        dataSource.secondaryWritingDate === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          formatedWritingDate
        )
    };

    const secondaryOralDate = {
      title: <FormattedMessage id="profile.oral" />,
      description:
        dataSource.secondaryOralDate === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          formatedOralDate
        )
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
}

export default injectIntl(OfficialLanguage);
