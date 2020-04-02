import React, { Component } from "react";
import ExperienceView from "./ExperienceView";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

function Experience(props) {
  const data = props.data;

  const getExperienceDuration = (startDate, endDate) => {
    const formatedStartDate = moment(startDate).format("ll");
    const formatedEndDate = moment(endDate).format("ll");

    const dateNotProvided = <FormattedMessage id="profile.date.not.provided" />;
    // this.props.intl.formatMessage({
    //   id: "profile.date.not.provided"
    // });

    const present = <FormattedMessage id="profile.end.date.present" />;
    // this.props.intl.formatMessage({
    //   id: "profile.end.date.present"
    // });

    let duration = "";

    if (startDate === null && endDate === null) {
      duration = duration + dateNotProvided;
    } else if (startDate !== null && endDate === null) {
      duration = duration + formatedStartDate + " - " + present;
    } else {
      duration = duration + formatedStartDate + " - " + formatedEndDate;
    }

    return duration;
  };

  const getExperienceInfo = dataSource => {
    const locale = localStorage.getItem("lang");
    let experienceInfo = [];
    if (dataSource.education != null) {
      dataSource.careerSummary.forEach(expElement => {
        const startDate = expElement.startDate;
        const endDate = expElement.endDate;

        const experience = {
          icon: "solution",
          jobTitle: expElement.header,
          organizationName: expElement.subheader,
          duration: getExperienceDuration(startDate, endDate)
        };

        experienceInfo.push(experience);
      });
    }

    return [...experienceInfo];
  };

  return <ExperienceView data={data} locale={localStorage.getItem("lang")} />;
}

export default injectIntl(Experience);
