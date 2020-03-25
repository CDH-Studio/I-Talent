import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import MentorshipView from "./MentorshipView";

function Mentorship(props) {
  return (
    <MentorshipView
      mentoring={setUpMentorshipSkills()}
      mentoringCategories={setUpCategories(props.data.mentorshipSkills)}
    />
  );
}

export default injectIntl(Mentorship);
