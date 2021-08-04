<img src="services/frontend/src/assets/I-talent-logo-light.png" alt="I-Talent Logo" width="270" />

**An improved directory and employee search tool.**

I-Talent is an internal web-application that would enable employees to share information about their employment status, job position, skills, and credentials. ISED employees can login to I-Talent with their windows credentials, where they can create a profile or search for employees with the right expertise, education, competencies, experience and other essential qualifications at any time for talent management, staffing, succession planning, or simply for insight on a project or file.

## Helpful links

### Access the live testing enviroments

[![DEV Deployment](https://img.shields.io/badge/Access%20Application-DEV-gray?logo=react&logoColor=white&style=for-the-badge&labelColor=green)](https://italent-development.apps.ocp.dev.ised-isde.canada.ca/)
[![UAT Deployment](https://img.shields.io/badge/Access%20Application-UAT-gray?logo=react&logoColor=white&style=for-the-badge&labelColor=green)](https://italent-uat.apps.ocp.dev.ised-isde.canada.ca/)

[![Drupal DEV](https://img.shields.io/badge/Drupal-DEV-gray?logo=drupal&labelColor=blue&style=for-the-badge)](https://italent-dev-cms-studioup-dev.apps.ocp.dev.ised-isde.canada.ca/en)
[![Drupal UAT](https://img.shields.io/badge/Drupal-UAT-gray?logo=drupal&labelColor=blue&style=for-the-badge)](https://italent-uat-cms-studioup-dev.apps.ocp.dev.ised-isde.canada.ca/en)

### Testing and Building Services

[![SonarQube Frontend](https://img.shields.io/badge/SonarQube-Frontend-gray?logo=sonarqube&&labelColor=yellow&style=for-the-badge)](https://sonarqube.ised-isde.canada.ca/dashboard?id=ITalent-frontend)
[![SonarQube Backend](https://img.shields.io/badge/SonarQube-Backend-gray?logo=sonarqube&labelColor=yellow&style=for-the-badge)](https://sonarqube.ised-isde.canada.ca/dashboard?id=ITalent-backend)
[![Jenkins](https://img.shields.io/badge/Jenkins-gray?logo=jenkins&logoColor=white&style=for-the-badge)](https://cicd.ised-isde.canada.ca/blue/organizations/jenkins/DSD%2FI-Talent%2FI-Talent/branches/)

### Hosting servers/services

[![OpenShift-DEV](https://img.shields.io/badge/OpenShift%20Management-DEV-gray?logo=red-hat-open-shift&style=for-the-badge&labelColor=red)](https://console-openshift-console.apps.ocp.dev.ised-isde.canada.ca/topology/ns/italent-development?view=graph)
[![OpenShift-UAT](https://img.shields.io/badge/OpenShift%20Management-UAT-gray?logo=red-hat-open-shift&style=for-the-badge&labelColor=red)](https://console-openshift-console.apps.ocp.dev.ised-isde.canada.ca/topology/ns/mytalent?view=graph)

# Getting started

You'll need to create three files to define the environment variables, one at the root of the project and two in the `env` folder. To get those variables, ask the current developers.

[Docker](https://www.docker.com/) and [Visual Studio Code](https://code.visualstudio.com/) are technically optional tools for development, but are highly recommended! A list of useful Visual Studio Code extensions are listed [here](https://github.com/CDH-Studio/I-Talent/wiki/Tech-stack#useful-visual-studio-code-extensions).

In the root of the project, to start developing the application use the [Docker Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) or run the following command:

```bash
docker-compose up
```

You can now access different components of the web application:

- [localhost:3000](http://localhost:3000) - Application
- [localhost:5555](http://localhost:5555) - Prisma studio, database visualizer/editor
- [localhost:3031](http://localhost:3031) - Webpack analyzer (need to run `yarn analyze` in the frontend docker container)
- [localhost:8080](http://localhost:8080) - API endpoints
- [localhost:8080/api-docs](http://localhost:8080/api-docs) - API endpoints documentation
- [localhost:5432](http://localhost:5432) - PostgreSQL database

> Note: Internet connection is required to run the application unless you setup keycloak locally with the steps described in the [wiki](https://github.com/CDH-Studio/I-Talent/wiki/Local-Keycloak-setup)

Visit backend [README](services/backend/README.md) and the frontend [README](services/frontend/README.md) for more information.

# Wiki

Visit the [Wiki](https://github.com/CDH-Studio/UpSkill/wiki) has more information about our tech stack, OpenShift project management and templating, Postman API testing setup, and local Keycloak setup.

# Contributors

Our full stack developers

| **Active developers**                                         | **Previous developers**                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------ |
| [Ali Nouri](https://www.linkedin.com/in/a-nouri/)             | [Trevor Bivi](https://www.linkedin.com/in/trevor-bivi-736181193/)  |
| [Mohamed Radwan](https://www.linkedin.com/in/mo-radwan/)      | [Benoît Jeaurond](https://www.linkedin.com/in/benoit-jeaurond/)    |
| [Rizvi Rab](https://www.linkedin.com/in/rizvi-rab-370327160/) | [Kate Thornley](https://www.linkedin.com/in/kate-a-w-thornley/)    |
|                                                               | [Mamadou Bah](https://www.linkedin.com/in/mamadou-bah-9962a711b/)  |
|                                                               | [Sagal Maxamud](https://www.linkedin.com/in/s-glmxmd/)             |
|                                                               | [Sukhsimranpreet Sekhon](https://www.linkedin.com/in/sukhusekhon/) |

# Contributing

Want to contribute to this project? Take a look at our [Wiki](https://github.com/CDH-Studio/UpSkill/wiki) and [CONTRIBUTING](CONTRIBUTING.md) file to start!

# Contact

This application is developed by students at [CDH Studio](https://cdhstudio.ca/)
