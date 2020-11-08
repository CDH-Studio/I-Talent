<img src="services/frontend/src/assets/I-talent-logo-light.png" alt="I-Talent Logo" width="270" />

[![DEV Deployment](https://img.shields.io/badge/Access%20Application-DEV-gray?logo=react&logoColor=white&style=for-the-badge&labelColor=green)](http://italent-development.apps.dev.openshift.ised-isde.canada.ca/)
[![UAT Deployment](https://img.shields.io/badge/Access%20Application-UAT-gray?logo=react&logoColor=white&style=for-the-badge&labelColor=green)](http://italent-uat.apps.dev.openshift.ised-isde.canada.ca/)
[![SonarQube Frontend](https://img.shields.io/badge/SonarQube-Frontend-blue?logo=sonarqube&logoColor=white&style=for-the-badge)](https://sonarqube-ised-ci.apps.dev.openshift.ised-isde.canada.ca/dashboard?id=ITalent-frontend)
[![SonarQube Backend](https://img.shields.io/badge/SonarQube-Backend-blue?logo=sonarqube&logoColor=white&style=for-the-badge)](https://sonarqube-ised-ci.apps.dev.openshift.ised-isde.canada.ca/dashboard?id=ITalent-backend)
[![DEV OpenShift](https://img.shields.io/badge/OpenShift%20Management-DEV-gray?logo=red-hat-open-shift&style=for-the-badge&labelColor=red)](https://console.dev.openshift.ised-isde.canada.ca:8443/console/project/italent-development/overview)
[![UAT OpenShift](https://img.shields.io/badge/OpenShift%20Management-UAT-gray?logo=red-hat-open-shift&style=for-the-badge&labelColor=red)](https://console.dev.openshift.ised-isde.canada.ca:8443/console/project/mytalent/overview)
[![Jenkins](https://img.shields.io/badge/Jenkins-gray?logo=jenkins&logoColor=white&style=for-the-badge)](https://cicd.ised-isde.canada.ca/job/DSD/job/I-Talent/job/I-Talent/)

An improved directory and employee search tool.

I-Talent is an internal web-application that would enable employees to share information about their employment status, job position, skills, and credentials. ISED employees can login to I-Talent with their windows credentials, where they can create a profile or search for employees with the right expertise, education, competencies, experience and other essential qualifications at any time for talent management, staffing, succession planning, or simply for insight on a project or file.

# Getting started

You'll need to create three files to define the envirnment variables, one at the root of the project and two in the `env` folder. To get those variables, ask the current developers. 

[Docker](https://www.docker.com/) and [Visual Studio Code](https://code.visualstudio.com/) are technically optional tools for development, but are highly recommended! A list of useful Visual Studio Code extensions are listed [here](https://github.com/CDH-Studio/I-Talent/wiki/Tech-stack#useful-visual-studio-code-extensions).

In the root of the project, to start developing the application use the [Docker Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) or run the following command:

```bash
docker-compose up
```

You can now access different components of the web application:

- [localhost:3000](http://localhost:3000) - Application
- [localhost:5555](http://localhost:5555) - Prisma studio, database visualizer/editer
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

| **Active developers** | **Previous developers** |
| --- | --- |
| [Ali Nouri](https://www.linkedin.com/in/a-nouri/) | [Trevor Bivi](https://www.linkedin.com/in/trevor-bivi-736181193/) |
| [Benoît Jeaurond](https://www.linkedin.com/in/benoit-jeaurond/) |  [Kate Thornley](https://www.linkedin.com/in/kate-a-w-thornley/) |
| [Mohamed Radwan](https://www.linkedin.com/in/mo-radwan/) | [Rizvi Rab](https://www.linkedin.com/in/rizvi-rab-370327160/) |
| [Mamadou Bah](https://www.linkedin.com/in/mamadou-bah-9962a711b/) | [Sagal Maxamud](https://www.linkedin.com/in/s-glmxmd/)
| [Sukhsimranpreet Sekhon](https://www.linkedin.com/in/sukhusekhon/)

# Contributing

Want to contribute to this project? Take a look at our [Wiki](https://github.com/CDH-Studio/UpSkill/wiki) and [CONTRIBUTING](CONTRIBUTING.md) file to start!

# Contact

This application is developped by students at [CDH Studio](https://cdhstudio.ca/)
