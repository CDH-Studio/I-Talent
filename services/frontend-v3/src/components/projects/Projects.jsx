import React from "react";
import PropTypes from "prop-types";
import ProjectsView from "./ProjectsView";

const Projects = ({ data }) => {
  return <ProjectsView projectsInfo={data.projects} />;
};

Projects.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.array,
  }).isRequired,
};

export default Projects;
