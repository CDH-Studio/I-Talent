import React from "react";
import { injectIntl } from "react-intl";

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
