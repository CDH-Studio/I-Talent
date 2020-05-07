import React from "react";
import ExperienceView from "./ExperienceView";
import { FormattedMessage } from "react-intl";
import moment from "moment";

function Experience(props) {
  const data = props.data;

  const getExperienceDuration = (startDate, endDate) => {
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

  const getExperienceInfo = (dataSource) => {
    let experienceInfo = [];
    if (dataSource.education != null) {
      dataSource.careerSummary.forEach((expElement) => {
        const startDate = expElement.startDate;
        const endDate = expElement.endDate;

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
