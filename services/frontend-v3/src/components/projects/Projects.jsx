import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProjectsView from "./ProjectsView";

const Projects = ({ data }) => {
  const [projectsInfo, setProjectsInfo] = useState([]);

  useEffect(() => {
    if (data.projects != null) {
      const tempProjects = [];
      data.projects.forEach((projectElement) => {
        const projects = {
          projectDescription: projectElement.text,
        };
        tempProjects.push(projects);
      });
      setProjectsInfo(tempProjects);
    }
  }, [data]);

  return (
    <ProjectsView
      data={data}
      locale={localStorage.getItem("lang") || "en"}
      projectsInfo={projectsInfo}
    />
  );
};

Projects.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.array,
  }).isRequired,
};

export default Projects;
