import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { useSelector } from "react-redux";
import { ProfileInfoPropType } from "../../customPropTypes";
import EducationView from "./EducationView";

const Education = ({ data }) => {
  const locale = useSelector((state) => state.settings.language);

  const getEducationDuration = (startDate, endDate) => {
    const formatedStartDate = moment(startDate).format("ll");
    const formatedEndDate = moment(endDate).format("ll");

    const dateNotProvided = <FormattedMessage id="profile.date.not.provided" />;

    let duration = "";

    if (startDate === null && endDate === null) {
      duration += dateNotProvided;
    } else if (startDate !== null && endDate === null) {
      duration = `${duration + formatedStartDate} - present`;
    } else {
      duration = `${duration + formatedStartDate} - ${formatedEndDate}`;
    }

    return duration;
  };

  const getEducationInfo = dataSource => {
    const educationInfo = [];
    if (dataSource.education != null) {
      dataSource.education.forEach(educElement => {
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
      educationInfo={getEducationInfo(data)}
    />
  );
}

Education.propTypes = { data: ProfileInfoPropType.isRequired };

export default Education;
