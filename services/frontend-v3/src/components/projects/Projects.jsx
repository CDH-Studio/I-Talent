import React from "react";
import PropTypes from "prop-types";
import ProjectsView from "./ProjectsView";
import ProfileCards from "../profileCards/ProfileCards";
import { ProfileInfoPropType } from "../../customPropTypes";

const Projects = ({ data, title, cardName, id, type, editUrl }) => {
  return (
    <ProfileCards
      title={title}
      content={<ProjectsView projectsInfo={data.projects} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={data.visibleCards.projects}
    />
  );
};

Projects.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  editUrl: PropTypes.string,
};

Projects.defaultProps = {
  data: null,
  type: null,
  editUrl: "",
};

export default Projects;
