import React from "react";
import PropTypes from "prop-types";
import ProjectsView from "./ProjectsView";
import ProfileCards from "../profileCards/ProfileCards";

const Projects = ({ data, title, cardName, id, type, visible, editUrl }) => {
  return (
    <ProfileCards
      title={title}
      content={<ProjectsView projectsInfo={data.projects} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={visible}
    />
  );
};

Projects.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.array,
  }).isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
  editUrl: PropTypes.string,
};

Projects.defaultProps = {
  type: null,
  visible: null,
  editUrl: "",
};

export default Projects;
