import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import ExperienceView from "./ExperienceView";

function Experience(props) {
  const { data } = props;

  const getExperienceDuration = (startDate, endDate) => {
    const formatedStartDate = moment(startDate).format("ll");
    const formatedEndDate = moment(endDate).format("ll");

    const dateNotProvided = <FormattedMessage id="profile.date.not.provided" />;

    let duration = "";

    if (startDate === null && endDate === null) {
      duration += dateNotProvided;
    } else if (startDate !== null && endDate === null) {
      duration = `${duration + formatedStartDate} - ` + `present`;
    } else {
      duration = `${duration + formatedStartDate} - ${formatedEndDate}`;
    }

    return duration;
  };

  const getExperienceInfo = (dataSource) => {
    const experienceInfo = [];
    if (dataSource.education != null) {
      dataSource.careerSummary.forEach((expElement) => {
        const { startDate } = expElement;
        const { endDate } = expElement;

        const experience = {
          description: expElement.content,
          duration: getExperienceDuration(startDate, endDate),
          icon: "solution",
          jobTitle: expElement.header,
          organizationName: expElement.subheader,
        };

        experienceInfo.push(experience);
      });
    }

    return [...experienceInfo];
  };

  return (
    <ExperienceView data={data} experienceInfo={getExperienceInfo(data)} />
  );
}

export default Experience;
