import React from "react";
import ProjectsView from "./ProjectsView";

function Projects(props) {
  const data = props.data;

  const getProjectsInfo = (dataSource) => {
    let projectsInfo = [];
    if (dataSource.projects != null) {
      dataSource.projects.forEach((projectElement) => {
        const projects = {
          projectDescription: projectElement.text,
        };
        projectsInfo.push(projects);
      });
    }

    return [...projectsInfo];
  };

  return (
    <ProjectsView
      data={data}
      locale={localStorage.getItem("lang") || "en"}
      projectsInfo={getProjectsInfo(data)}
    />
  );
}

export default Projects;
