import React from "react";
import PropTypes from "prop-types";
import ProjectsView from "./ProjectsView";
import ProfileCards from "../profileCards/ProfileCards";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const Projects = ({ data, editableCardBool }) => {
  return (
    <ProfileCards
      titleId="profile.projects"
      content={<ProjectsView projectsInfo={data.projects} />}
      cardName="projects"
      id="card-profile-projects"
      editUrl="/profile/edit/qualifications?tab=experience"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.projects}
    />
  );
};

Projects.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

Projects.defaultProps = {
  data: null,
  editableCardBool: null,
};

export default Projects;
