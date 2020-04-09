import React from "react";
import EducationView from "./EducationView";
import { FormattedMessage } from "react-intl";
import moment from "moment";

function Education(props) {
  const getEducationDuration = (startDate, endDate) => {
    const formatedStartDate = moment(startDate).format("ll");
    const formatedEndDate = moment(endDate).format("ll");

    const dateNotProvided = <FormattedMessage id="profile.date.not.provided" />;

    let duration = "";

    if (startDate === null && endDate === null) {
      duration = duration + dateNotProvided;
    } else if (startDate !== null && endDate === null) {
      duration = duration + formatedStartDate + " - " + "present";
    } else {
      duration = duration + formatedStartDate + " - " + formatedEndDate;
    }

    return duration;
  };

  const getEducationInfo = (dataSource) => {
    const locale = localStorage.getItem("lang");

    let educationInfo = [];
    if (dataSource.education != null) {
      dataSource.education.forEach((educElement) => {
        const startDate = educElement.startDate[locale];
        const endDate = educElement.endDate[locale];

        const education = {
          diploma: educElement.diploma.description[locale],
          school: educElement.school.description[locale],
          duration: getEducationDuration(startDate, endDate),
        };

        educationInfo.push(education);
      });
    }

    return [...educationInfo];
  };

  return (
    <EducationView
      locale={localStorage.getItem("lang")}
      educationInfo={getEducationInfo(props.data)}
    />
  );
}

export default Education;
